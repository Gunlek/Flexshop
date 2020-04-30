let app = new Vue({
    el: '#workshops',
    delimiters: ['${', '}'],
    data: {
        workshop_list: [],
        new_workshop_name: null,
        new_workshop_image: null
    },
    methods: {
        get_workshop_list: function(){
            let super_this = this;
            let url = '/workshops/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        super_this.workshop_list = JSON.parse(httpRequest.responseText);
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        },
        add_new_workshop: function(){
            if(this.new_workshop_name != null && this.new_workshop_image != null){
                let super_this = this;
                let url = '/workshops/add';
                let params = "workshop_title="+this.new_workshop_name.toString()+"&workshop_image="+this.new_workshop_image.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function(data){
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            super_this.get_workshop_list();
                        }
                    }
                };
                httpRequest.open('POST', url);
                httpRequest.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded",
                );
                httpRequest.send(params);
            }
        },
        del_workshop: function(id){let super_this = this;
            let url = '/workshops/delete/'+id.toString();

            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        for(let k=0; k < super_this.workshop_list.length; k++){
                            if(super_this.workshop_list[k].workshop_id == id){
                                super_this.workshop_list = super_this.workshop_list.splice(k, 1);
                            }
                        }
                        super_this.get_workshop_list();
                    }
                }
            };
            httpRequest.open('DELETE', url);
            httpRequest.send();
        }
    },
    mounted: function(){
        this.get_workshop_list();
    }
})