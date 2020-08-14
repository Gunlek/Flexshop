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
        new_section_type: "description",
        new_section_machine: "",

        json_sections_data: {},
        edit_modal: false,
        edit_data: {},
    },
    computed: {
        full_machines: function(){
            let section_with_parameters = this.section_list;
            for(let k=0; k<section_with_parameters.length; k++){
                let parameter_list = [];
                let cur_section = section_with_parameters[k];
                let cur_section_type = cur_section.section_type;
                for(let k=0; k<this.parameter_list.length; k++){
                    if(cur_section.section_id == this.parameter_list[k].parameter_section){
                        if(this.json_sections_data.hasOwnProperty(cur_section_type)){
                            Object.keys(this.json_sections_data[cur_section_type]["parameters"]).forEach(key => {
                                let arr = this.json_sections_data[cur_section_type]["parameters"];
                                if(arr[key].name == this.parameter_list[k]["parameter_name"]){
                                    this.parameter_list[k]["parameter_display_name"] = arr[key]["display_name"];
                                    this.parameter_list[k]["parameter_type"] = arr[key]["type"];
                                }
                            });
                            parameter_list.push(this.parameter_list[k]);
                        }
                    }
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
        get_section_list: function(cb = () => {}){
            let url = '/sections/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = (data) => {
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        this.section_list = JSON.parse(httpRequest.responseText);
                        Object.keys(this.section_list).forEach(key => {
                            if(this.json_sections_data.hasOwnProperty(this.section_list[key]["section_type"]))
                                this.section_list[key]["section_display_name"] = this.json_sections_data[this.section_list[key]["section_type"]]["display_name"];
                        });
                        cb();
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
        add_new_parameter: function(parameter_section, parameter_name){
            if(parameter_section != null && parameter_name != null){
                let url = '/parameters/add';
                let params = "parameter_section="+parameter_section.toString()+"&parameter_name="+parameter_name.toString()+"&parameter_value=";

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = (data) => {
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            this.get_parameter_list();
                            this.new_parameter_name = null;
                            this.new_parameter_value = null;
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
                // create the new section
                let url = '/sections/add';
                let params = "section_machine="+this.new_section_machine.toString()+"&section_type="+this.new_section_type.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = (data) => {
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            // refresh the section_list
                            this.get_section_list(() => {
                                // then get the new section's id
                                let new_section_id = this.section_list[this.section_list.length - 1]['section_id'];
                                // then add corresponding parameters for the specific section
                                this.createCorrespondingParameters(new_section_id, this.new_section_type.toString());
                            });
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
        createCorrespondingParameters: function(section_id, section_type){
            if(this.json_sections_data.hasOwnProperty(section_type)){
                let parameter_list = this.json_sections_data[section_type]["parameters"];
                parameter_list.forEach((parameter) => {
                    this.add_new_parameter(section_id, parameter["name"]);
                })
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
        },

        // Get data from stored json file
        // to handle section creation and parameters
        getJSONSectionData: async function(){
            let response = await fetch("../json/sections.json");
            this.json_sections_data = await response.json();
        },

        // Handle edition, open modal and load data
        editCard: function(section_data){
            this.edit_data = section_data;
            
            document.querySelector(".table-body").classList.add("modal-open");
            this.edit_modal = true;
        },

        // Hide modal and remove overflow hidden class
        hideEditCard: function(){
            document.querySelector(".table-body").classList.remove("modal-open");
            this.edit_modal = false;
        },

        // Update parameters for the corresponding section
        updateSection: function(){
            console.log("update");
            let input_list = document.querySelectorAll(".edition_input");
            updatedFields = 0;
            document.querySelectorAll(".edition_input").forEach((el) => {
                let update_id = el.getAttribute("name");
                let update_value = el.value;
                let url = '/parameters/update/'+update_id.toString();
                let params = "parameter_value="+update_value.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = (data) => {
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            updatedFields += 1;

                            if(input_list.length == updatedFields){
                                this.get_parameter_list();
                                this.hideEditCard();
                            }
                        }
                    }
                };
                httpRequest.open('PUT', url);
                httpRequest.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded",
                );
                httpRequest.send(params);
            })
        }
    },

    components: {
        'text-list': {
            data: function() {
                return {
                new_text: "",
                text_list: [],
                list_value: ""
                };
            },
            props: ['name', 'value'],
            methods: {
                insert_value: function(){
                    if(this.new_text != ""){
                        this.text_list.push(this.new_text);
                        this.new_text = "";

                        this.list_value = "";
                        for(let k=0; k < this.text_list.length; k++){
                            if(k < this.text_list.length - 1) {
                                this.list_value += this.text_list[k];
                                this.list_value += ";";
                            }
                            else
                                this.list_value += this.text_list[k];
                        }
                    }
                },
                remove_value: function(index){
                    this.text_list.splice(index, 1);
                    
                    this.list_value = "";
                    for(let k=0; k < this.text_list.length; k++){
                        if(k < this.text_list.length - 1) {
                            this.list_value += this.text_list[k];
                            this.list_value += ";";
                        }
                        else
                            this.list_value += this.text_list[k];
                    }
                }
            },
            mounted: function(){
                this.list_value = this.value;
                this.text_list = this.list_value.split(';');
            },
            template: "<div><input type='hidden' v-bind:name='name' v-bind:value='list_value' class='edition_input'/><div class='row'><div class='col-8' style='padding-right: 5px;'><input type='text' v-model='new_text' class='form-control content-fluid' style='margin: 0;' placeholder='Ajouter à la liste...'/></div> <div class='col-4' style='padding-left: 5px;'><button class='content-fluid btn btn-outline-green' @click='insert_value()'>Ajouter</button></div></div> <div><ul v-for='(text, index) in text_list'><li>{{text}}&nbsp;&nbsp;<button class='btn btn-outline-red' @click='remove_value(index)'><i class='fa fa-trash' /></button></li></ul></div></div>"
        },

        'link-list': {
            data: function() {
                return {
                new_text: "",
                text_list: [],
                list_value: ""
                };
            },
            props: ['name', 'value'],
            methods: {
                insert_value: function(){
                    if(this.new_text != ""){
                        this.text_list.push(this.new_text);
                        this.new_text = "";

                        this.list_value = "";
                        for(let k=0; k < this.text_list.length; k++){
                            if(k < this.text_list.length - 1) {
                                this.list_value += this.text_list[k];
                                this.list_value += ";";
                            }
                            else
                                this.list_value += this.text_list[k];
                        }
                    }
                },
                remove_value: function(index){
                    this.text_list.splice(index, 1);
                    
                    this.list_value = "";
                    for(let k=0; k < this.text_list.length; k++){
                        if(k < this.text_list.length - 1) {
                            this.list_value += this.text_list[k];
                            this.list_value += ";";
                        }
                        else
                            this.list_value += this.text_list[k];
                    }
                }
            },
            mounted: function(){
                this.list_value = this.value;
                this.text_list = this.list_value.split(';');
            },
            template: "<div><input type='hidden' v-bind:name='name' v-bind:value='list_value' class='edition_input'/><div class='row'><div class='col-8' style='padding-right: 5px;'><input type='text' v-model='new_text' class='form-control content-fluid' style='margin: 0;' placeholder='Ajouter à la liste...'/></div> <div class='col-4' style='padding-left: 5px;'><button class='content-fluid btn btn-outline-green' @click='insert_value()'>Ajouter</button></div></div> <div><ul v-for='(text, index) in text_list'><li><a v-bind:href='text' target='_blank'>{{text}}</a>&nbsp;&nbsp;<button class='btn btn-outline-red' @click='remove_value(index)'><i class='fa fa-trash' /></button></li></ul></div></div>"
        },

        'picto-list': {
            data: function(){
                return {
                    pictograms: ["picto_general.png", "picto_glasses.png", "picto_gloves.png", "picto_harness.png", "picto_helmet.png", "picto_mask.png", "picto_noise.png", "picto_notice.png", "picto_pedestrian.png", "picto_shoes.png", "picto_suit.png", "picto_visor.png"],
                    picto_list: [],
                    picto_str: ""
                };
            },
            props: ['name', 'value'],
            methods: {
                update_list: function(){
                    this.picto_str = "";
                    for(let k = 0; k < this.picto_list.length; k++){
                        if(k < this.picto_list.length - 1){
                            this.picto_str += this.picto_list[k];
                            this.picto_str += ";";
                        }
                        else
                            this.picto_str += this.picto_list[k];
                    }
                },
                checked: function(picto){
                    if(this.picto_list.indexOf(picto) >= 0)
                        return true;
                    else
                        return false;
                }
            },
            mounted: function(){
                this.picto_str = this.value;
                this.picto_list = this.picto_str.split(';');
                console.log(this.picto_list);
            },
            template: "<div><input type='hidden' v-bind:name='name' v-bind:value='picto_str' class='edition_input' /><span v-for='picto in pictograms'><input v-model='picto_list' v-bind:checked='checked(picto)' @change='update_list()' type='checkbox' name='pictos' v-bind:value='picto' v-bind:id='picto' /><label v-bind:for='picto'><img v-bind:src='\"/img/pictograms/\" + picto' style='width: 30px; vertical-align: middle;'/></label></span></div>"
        }
    },

    mounted: async function(){
        await this.getJSONSectionData();

        this.get_category_list();
        this.get_parameter_list();
        this.get_section_list();
        this.get_machine_list();
    }
});