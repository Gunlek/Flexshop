let app = new Vue({
    el: '#workshops',
    delimiters: ['${', '}'],
    data: {
        category_list: [],
        machine_list: [],
        workshop_list: [],
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
         * Category variables
         */
        new_category_title: null,
        new_category_workshop: "",

        /**
         * Workshop variables
         */
        new_workshop_name: null,
        new_workshop_image: null
    },
    computed: {
        full_workshops: function(){
            let categories_with_machines = this.category_list;
            for(let k=0; k<categories_with_machines.length; k++){
                let machine_list = [];
                let cur_category = categories_with_machines[k];
                for(let k=0; k<this.machine_list.length; k++){
                    if(cur_category.category_id == this.machine_list[k].machine_category)
                    machine_list.push(this.machine_list[k]);
                }
                categories_with_machines[k]['machines'] = machine_list;
            }

            let workshops_with_categories = this.workshop_list;
            for(let k=0; k<workshops_with_categories.length; k++){
                let category_list = [];
                let cur_workshop = workshops_with_categories[k];
                for(let k=0; k<categories_with_machines.length; k++){
                    if(cur_workshop.workshop_id == categories_with_machines[k].category_workshop)
                    category_list.push(categories_with_machines[k]);
                }
                workshops_with_categories[k]['categories'] = category_list;
            }

            console.log(workshops_with_categories)
            return workshops_with_categories;
        }
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

        /**
         * Machines handlers
         */
        add_new_machine: function(category_id){
            this.new_machine_category = category_id;
            if(this.new_machine_title != null && this.new_machine_category != null && this.new_machine_brand != null && this.new_machine_image != null && this.new_machine_reference != null){
                let super_this = this;
                let url = '/machines/add';
                let params = "machine_title="+this.new_machine_title.toString()+"&machine_category="+this.new_machine_category.toString()+"&machine_brand="+this.new_machine_brand.toString()+"&machine_image="+this.new_machine_image.toString()+"&machine_reference="+this.new_machine_reference.toString();

                let httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function(data){
                    if(httpRequest.readyState === 4){
                        if(httpRequest.status >= 200 && httpRequest.status <= 300){
                            super_this.get_machine_list();
                            super_this.new_machine_title = null;
                            super_this.new_machine_category = "";
                            super_this.new_machine_brand = null;
                            super_this.new_machine_image = null;
                            super_this.new_machine_reference = null;
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

        /**
         * Category handlers
         */
        add_new_category: function(workshop_id){
            this.new_category_workshop = workshop_id;
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
        },

        /**
         * Workshop handlers
         */
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
        this.get_category_list();
        this.get_machine_list();
    }
});