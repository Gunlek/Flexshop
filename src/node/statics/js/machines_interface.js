let app = new Vue({
    el: '#workshops',
    delimiters: ['${', '}'],
    data: {
        category_list: [],
        machine_list: [],
        new_machine_title: null,
        new_machine_category: "",
        new_machine_brand: null,
        new_machine_image: null,
        new_machine_reference: null
    },
    methods: {
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
        get_machine_list: function(){
            let super_this = this;
            let url = '/machines/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        super_this.machine_list = JSON.parse(httpRequest.responseText);
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        },
        add_new_machine: function(){
            if(this.new_machine_title != null && this.new_machine_category != null && this.new_machine_brand != null && this.new_machine_image != null && this.new_machine_reference != null){
                let super_this = this;
                let url = '/machines/add';
                let params = "machine_title="+this.new_machine_title.toString()+"&machine_category="+this.new_machine_category.toString()+"&machine_brand="+this.new_machine_brand.toString()+"&machine_image="+this.new_machine_image.toString()+"&machine_reference="+this.new_machine_reference.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function(data){
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            super_this.get_machine_list();
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
        del_machine: function(id){let super_this = this;
            let url = '/machines/delete/'+id.toString();

            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        for(let k=0; k < super_this.machine_list.length; k++){
                            if(super_this.machine_list[k].machine_list == id){
                                super_this.machine_list = super_this.machine_list.splice(k, 1);
                            }
                        }
                        super_this.get_machine_list();
                    }
                }
            };
            httpRequest.open('DELETE', url);
            httpRequest.send();
        },
        getMachineCategoryName: function(machine_category){
            for(let k=0; k < this.category_list.length; k++){
                if(parseInt(this.category_list[k].category_id) == parseInt(machine_category)){
                    return this.category_list[k].category_title
                }
            }
        }
    },
    mounted: function(){
        this.get_machine_list();
        this.get_category_list();
    }
})