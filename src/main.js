import Vue from 'vue'
import {Time} from './time'
import _ from 'lodash';

// require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
// require('bootstrap');

require('bootstrap/dist/css/bootstrap.min.css');

let meuVue = new Vue({
    el: '#app',
    //sem v-for
    // data: {
    //     time: new Time('America MG', require('./assets/america_mg_60x60.png'))
    // },
    //com v-for
    data: {
        filter: '',
        order: {
            keys: ['pontos', 'g. Marc', 'g. Sofr'],
            sort: ['desc', 'desc', 'asc']
        },
        colunas: ['nome', 'pontos', 'g. Marc', 'g. Sofr', 'saldo'],
        times: [
            new Time('America MG', require('./assets/america_mg_60x60.png')),
            new Time('Americo PR', require('./assets/atletico-pr_60x60.png')),
            new Time('Americo MG', require('./assets/atletico_mg_60x60.png')),
            new Time('Palmeiras', require('./assets/palmeiras_60x60.png')),
            new Time('São Paulo', require('./assets/sao_paulo_60x60.png')),
            new Time('Corinthians', require('./assets/corinthians_60x60.png')),
        ],
        novoJogo: {
            casa: {
                time: null,
                gols: 0
            },
            fora: {
                time: null,
                gols: 0
            }
        },
        view: 'tabela'
    },
    methods: {
        fimJogo(){
            let timeAdversario = this.novoJogo.fora.time;
            let gols = +this.novoJogo.casa.gols;
            let golsAdversario = +this.novoJogo.fora.gols;
            this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);

            this.showView('tabela');
        },
        createNovoJogo(){
            let indexCasa = Math.floor(Math.random() * 6),
                indexFora = Math.floor(Math.random() * 6);

            this.novoJogo.casa.time = this.times[indexCasa];
            this.novoJogo.casa.gols = 0;
            this.novoJogo.fora.time = this.times[indexFora];
            this.novoJogo.fora.gols = 0;
            this.showView('novojogo');
        },
        showView(view){
            this.view = view;
        },
        sortBy(coluna){
            console.log(this.order.sort);
            this.order.keys = coluna;
            this.order.sort = (this.order.sort == 'desc') ? 'asc' : 'desc';
        }
    },
    computed: {
        timesFiltered(){
            let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

            return _.filter(colecao, item => {
                return item.nome.indexOf(this.filter) >= 0;
            });
        }
    },
    filters: {
        saldo(time){
            return time.gm - time.gs;
        },
/*ucwords*/maiuscula(value){
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
});
