let app = new Vue({
    el: '#workshops',
    delimiters: ['${', '}'],
    data: {
        category_list: [],
        section_list: [],
        parameter_list: [],
        machine_list: [],
        new_parameter_section: "",
        new_parameter_name: null,
        new_parameter_value: null,

        /**
         * Machine variables
         */
        new_machine_title: null,
        new_machine_category: "",
        new_machine_brand: null,
        new_machine_image: null,
        new_machine_reference: null,

        /**
         * Section variables
         */
        new_section_type: null,
        new_section_machine: "",
    },
    computed: {
        full_machines: function(){
            let section_with_parameters = this.section_list;
            for(let k=0; k<section_with_parameters.length; k++){
                let parameter_list = [];
                let cur_section = section_with_parameters[k];
                for(let k=0; k<this.parameter_list.length; k++){
                    if(cur_section.section_id == this.parameter_list[k].parameter_section)
                        parameter_list.push(this.parameter_list[k]);
                }
                section_with_parameters[k]['parameters'] = parameter_list;
            }

            let machines_with_sections = this.machine_list;
            for(let k=0; k<machines_with_sections.length; k++){
                let section_list = [];
                let cur_machine = machines_with_sections[k];
                for(let k=0; k<section_with_parameters.length; k++){
                    if(cur_machine.machine_id == section_with_parameters[k].section_machine)
                        section_list.push(section_with_parameters[k]);
                }
                machines_with_sections[k]['sections'] = section_list;
            }

            return machines_with_sections;
        }
    },

    methods: {
        move_section_in_machine: function(evt){
            if(evt.hasOwnProperty('moved')){
                let dragged_el = evt.moved.oldIndex;
                let new_index = evt.moved.newIndex;
                let machine_id = evt.moved.element.section_machine;
                this.exchange_index(machine_id, dragged_el, new_index);
            }
        },
        exchange_index: function(machine, old_index, new_index){
            let current_machine = null;
            for(let k=0;k<this.machine_list.length;k++){
                if(this.machine_list[k].machine_id == machine){
                    current_machine = this.machine_list[k];
                    break;
                }
            }
            let sections = current_machine.sections;
            let old_el_id = sections[old_index].section_id;
            let new_el_id = sections[new_index].section_id;
            this.move_section_to_index(old_el_id, old_index);
            this.move_section_to_index(new_el_id, new_index);
            this.get_section_list();
        },
        move_section_to_index(section_id, new_index){
            console.log(section_id);
            console.log(new_index);
            console.log(" ");
            let url = '/sections/update/'+section_id.toString();
            let params = "section_sort_index="+new_index.toString();

            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(data){
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        // Success
                    }
                }
            };
            httpRequest.open('PUT', url);
            httpRequest.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded",
            );
            httpRequest.send(params);
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

        /**
         * Parameters handlers
         */
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
        add_new_parameter: function(parameter_section){
            this.new_parameter_section = parameter_section;
            if(this.new_parameter_section != null && this.new_parameter_name != null && this.new_parameter_value != null){
                let super_this = this;
                let url = '/parameters/add';
                let params = "parameter_section="+this.new_parameter_section.toString()+"&parameter_name="+this.new_parameter_name.toString()+"&parameter_value="+this.new_parameter_value.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function(data){
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            super_this.get_parameter_list();
                            super_this.new_parameter_name = null;
                            super_this.new_parameter_value = null;
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

        /**
         * Sections handlers
         */
        add_new_section: function(machine_id){
            this.new_section_machine = machine_id;
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

        /**
         * Machines handlers
         */
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
                            this.new_machine_title = null;
                            this.new_machine_category = "";
                            this.new_machine_brand = null;
                            this.new_machine_image = null;
                            this.new_machine_reference = null;
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

        // Get the name of the machine specified in the section_machine field
        // of the database
        getSectionMachineName: function(section_machine){
            for(let k=0; k < this.machine_list.length; k++){
                if(parseInt(this.machine_list[k].machine_id) == parseInt(section_machine)){
                    return this.machine_list[k].machine_title + " " + this.machine_list[k].machine_brand + " " + this.machine_list[k].machine_reference
                }
            }
        }
    },
    mounted: function(){
        this.get_category_list();
        this.get_parameter_list();
        this.get_section_list();
        this.get_machine_list();
    }
});