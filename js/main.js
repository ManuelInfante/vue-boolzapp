Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    data:{
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        currentContact: 0,
        newMessage: '',
        find: null,
        currentMessage: {
            index: false,
            show: false,
        },
    },
    methods: {
        selectedContact(index) {
            this.currentContact = index
            console.log(this.currentContact)
        },

        getMessageClass(index) {
            let thisContact = this.contacts[this.currentContact];
            let messageClass = 'message' + ' ' + thisContact.messages[index].status;

            return messageClass;
        },

        sendMessage() {
            if (!this.newMessage == ''){
                let thisContact = this.contacts[this.currentContact];

                thisContact.messages.push(
                    {
                        message: this.newMessage,
                        date: dayjs().format('DD/MM/YYYY hh:mm:ss'),
                        status: 'sent',
                    }
                );

                setTimeout(() =>{
                    thisContact.messages.push(
                        {
                            message: 'Ok',
                            date: dayjs().format('DD/MM/YYYY hh:mm:ss'),
                            status: 'received',
                        }
                    );
                }, 1500);

                this.newMessage = '';
            };
        },

        finder() {
            this.contacts.forEach((element) => {
                if (!this.find == '') {
                    if (element.name.toLowerCase().includes(this.find.toLowerCase())) {         
                        element.visible = true;
                    }else {
                        element.visible = false;
                    }
                }else {
                    element.visible = true;
                }
            }); 
        },
        showOptions(index) {
            if(this.currentMessage.index !==false && this.currentMessage.index !== index){
                this.currentMessage.show = false;
                this.currentMessage.index = false;
            } else {
                this.currentMessage.show = (this.currentMessage.show) ? false : true ;
                this.currentMessage.index = index;
            }
        },
        deleteMessage(index) {
            this.contacts[this.currentContact].messages.splice(index, 1);

            // Facciamo scomparire il pannello delle opzioni
            this.currentMessage.show = false;
            this.currentMessage.index = false;
        },
        lostFocus() {
            this.currentMessage.show = false;
            this.currentMessage.index = false;
        },
        getLastMessage(index) {
            if(this.contacts[index].messages[this.contacts[index].messages.length - 1].message.length < 30){
                return this.contacts[index].messages[this.contacts[index].messages.length - 1].message;
            } else {
                return this.contacts[index].messages[this.contacts[index].messages.length - 1].message.slice(0, 30) + '...';
            }
        },
    },
});