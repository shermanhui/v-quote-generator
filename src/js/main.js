let quote = {
    text: '',
    author: '',
    url: '',
}

let buttonComponent = {
    template: `<button id="generate" class="ui primary basic button" v-on:click="$parent.getQuotes">Click here to generate a quote</button>`
}

let Child = {
    props: ['quote'],
    template: `<div v-show="quote.text !== ''" class="ui padded segment quotes"><p>{{quote.text}}</p><p class="alignright">- {{quote.author}}</p></div>`
}

// const quoteGenerator = {
//     template: `<article class="ui center aligned container content">
//     <div class="ui raised very padded text container segment">
//     <h2 class="ui header">Random Quote Generator</h2>
//     <p>Welcome to my Random Quote Generator</p>
//     <div is="generate-quote"></div>
//     <my-component v-bind:quote="quote"></my-component>
//     </div>
//     </article>`,
//     component: {'generate-quote': buttonComponent,
//                 'my-component': Child}
// }
// const aboutPage = {
//     template: '<article class="ui center aligned container content"><h2>About Page</h2></article>'
// }
// const homePage = {
//     template: '<article class="ui center aligned container content"><h2>Home</h2></article>'
// }
//
// const routes = [
//     {path: '/', component: homePage},
//     {path: '/about', component: aboutPage},
//     {path: '/generate', component: quoteGenerator}
// ]
// const router = new VueRouter({
//     routes
// })

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
            }).fail(() => {
                return 'There was an error with this request.'
            })
        }
        // getQuotes: () => {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open('GET', 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?');
        //     xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
        //     xhr.setRequestHeader("Content-Type","application/jsonp");
        //     xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        //     xhr.setRequestHeader("Accept","application/jsopn");
        //     xhr.onload = () => {
        //         quote.author = res.quoteAuthor;
        //         quote.text   = res.quoteText;
        //         quote.url    = res.quoteLink;
        //     }
        //     xhr.send();
        // }
    }
})

$('#generate').on('click', function(){
    $('#generate')
        .transition('pulse', '50ms');
})
