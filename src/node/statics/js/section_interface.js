let app = new Vue({
    el: '#workshops',
    delimiters: ['${', '}'],
    data: {
        machine_list: [],
        section_list: [],
        new_section_machine: "",
        new_section_type: null
    },
    methods: {
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
        get_section_list: function(){
            let super_this = this;
            let url = '/sections/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        super_this.section_list = JSON.parse(httpRequest.responseText);
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        },
        add_new_section: function(){
            if(this.new_section_machine != null && this.new_section_type != null){
                let super_this = this;
                let url = '/sections/add';
                let params = "section_machine="+this.new_section_machine.toString()+"&section_type="+this.new_section_type.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function(data){
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            super_this.get_section_list();
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
        del_section: function(id){let super_this = this;
            let url = '/sections/delete/'+id.toString();

            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        for(let k=0; k < super_this.section_list.length; k++){
                            if(super_this.section_list[k].section_id == id){
                                super_this.section_list = super_this.section_list.splice(k, 1);
                            }
                        }
                        super_this.get_section_list();
                    }
                }
            };
            httpRequest.open('DELETE', url);
            httpRequest.send();
        },
        getSectionMachineName: function(section_machine){
            for(let k=0; k < this.machine_list.length; k++){
                if(parseInt(this.machine_list[k].machine_id) == parseInt(section_machine)){
                    return this.machine_list[k].machine_title + " " + this.machine_list[k].machine_brand + " " + this.machine_list[k].machine_reference
                }
            }
        }
    },
    mounted: function(){
        this.get_machine_list();
        this.get_section_list();
    }
})