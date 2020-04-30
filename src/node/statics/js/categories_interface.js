let app = new Vue({
    el: '#workshops',
    delimiters: ['${', '}'],
    data: {
        category_list: [],
        workshop_list: [],
        new_category_title: null,
        new_category_workshop: ""
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
        get_category_list: function(){
            let super_this = this;
            let url = '/category/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        super_this.category_list = JSON.parse(httpRequest.responseText);
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        },
        add_new_category: function(){
            if(this.new_category_title != null && this.new_category_workshop != null){
                let super_this = this;
                let url = '/category/add';
                let params = "category_title="+this.new_category_title.toString()+"&category_workshop="+this.new_category_workshop.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function(data){
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            super_this.get_category_list();
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
        del_category: function(id){let super_this = this;
            let url = '/category/delete/'+id.toString();

            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        for(let k=0; k < super_this.category_list.length; k++){
                            if(super_this.category_list[k].category_id == id){
                                super_this.category_list = super_this.category_list.splice(k, 1);
                            }
                        }
                        super_this.get_category_list();
                    }
                }
            };
            httpRequest.open('DELETE', url);
            httpRequest.send();
        },
        getCategoryWorkshopTitle: function(category_workshop){
            for(let k=0; k < this.workshop_list.length; k++){
                if(parseInt(this.workshop_list[k].workshop_id) == parseInt(category_workshop)){
                    return this.workshop_list[k].workshop_title;
                }
            }
        }
    },
    mounted: function(){
        this.get_workshop_list();
        this.get_category_list();
    }
})