// Vue.component('generateQuote', {
//     template: '<button v-on:click>Click here to generate a quote</button>',
// })
// let config = {
//     headers: {  'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Accept',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//                 'Accept': 'application/json',
//                 'Access-Control-Allow-Methods': 'GET, POST, PUT'}
// }
let quote = {
    text: '',
    author: '',
    url: '',
}
let buttonComponent = {
    template: '<button v-on:click="$parent.getQuotes">Click here to generate a quote</button>'
}

let Child = {
    props: ['quote'],
    template: '<div><p>{{quote.text}}</p><p>- {{quote.author}}</p></div>'
}

let vm = new Vue({
    el: '#quote-generator',
    data: {
        quote: quote
    },
    components: {
        'generate-quote': buttonComponent,
        'my-component': Child
    },
    methods: {
        getQuotes: () => {
            $.ajax({
                url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
                type: 'GET',
                dataType: 'jsonp',
                contentType: 'application/json'
            }).done((res) => {
                quote.author = res.quoteAuthor;
                quote.text   = res.quoteText;
                quote.url    = res.quoteLink;
                console.log(vm.quote);
            }).fail(() => {
                return 'There was an error with this request.'
            })
            // axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', config)
            //     .then(function(res){
            //         console.log(res)
            //     });
        }
    }
})
