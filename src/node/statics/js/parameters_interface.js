let app = new Vue({
    el: '#workshops',
    delimiters: ['${', '}'],
    data: {
        section_list: [],
        parameter_list: [],
        machine_list: [],
        new_parameter_section: "",
        new_parameter_name: null,
        new_parameter_value: null
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
        get_parameter_list: function(){
            let super_this = this;
            let url = '/parameters/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        super_this.parameter_list = JSON.parse(httpRequest.responseText);
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        },
        add_new_parameter: function(){
            if(this.new_parameter_section != null && this.new_parameter_name != null && this.new_parameter_value != null){
                let super_this = this;
                let url = '/parameters/add';
                let params = "parameter_section="+this.new_parameter_section.toString()+"&parameter_name="+this.new_parameter_name.toString()+"&parameter_value="+this.new_parameter_value.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function(data){
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            super_this.get_parameter_list();
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
        del_parameter: function(id){let super_this = this;
            let url = '/parameters/delete/'+id.toString();

            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        for(let k=0; k < super_this.parameter_list.length; k++){
                            if(super_this.parameter_list[k].parameter_id == id){
                                super_this.parameter_list = super_this.parameter_list.splice(k, 1);
                            }
                        }
                        super_this.get_parameter_list();
                    }
                }
            };
            httpRequest.open('DELETE', url);
            httpRequest.send();
        },
        getParameterSectionName: function(parameter_section){
            for(let k=0; k < this.section_list.length; k++){
                if(parseInt(this.section_list[k].section_id) == parseInt(parameter_section)){
                    return this.section_list[k].section_type;
                }
            }
        },
        getSectionMachine: function(machine_section){
            for(let k=0; k < this.machine_list.length; k++){
                if(parseInt(this.machine_list[k].machine_id) == parseInt(machine_section)){
                    return this.machine_list[k].machine_title + " " + this.machine_list[k].machine_brand + " " + this.machine_list[k].machine_reference;
                }
            }
        }
    },
    mounted: function(){
        this.get_parameter_list();
        this.get_section_list();
        this.get_machine_list();
    }
})