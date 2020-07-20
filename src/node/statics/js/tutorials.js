let app = new Vue({
    el: '#tutorials',
    delimiters: ['${', '}'],
    data: {
        slide_list: [],
        machine_list: [],

        machine_tutorials: {},

        new_slide_title: "",
        new_slide_image: "",
        new_slide_image_render: "",
        new_slide_image_name: "Fichier",
        new_slide_description: "",
        new_tutorial_machine: -1,

        edit_modal: false,
        edit_data: {},
    },
    methods: {
        get_machine_list: function(){
            let url = '/machines/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = (data) => {
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        this.machine_list = JSON.parse(httpRequest.responseText);
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        },

        get_slide_list: function(){
            let url = '/slides/list';
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = (data) => {
                if(httpRequest.readyState === 4){
                    if(httpRequest.status >= 200 && httpRequest.status <= 300){
                        this.slide_list = JSON.parse(httpRequest.responseText);
                        this.update_tutorials_list();
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        },

        add_slide: function(machine_id, creation=false){
            let slide_machine = machine_id;
            let slide_number = creation ? 0 : this.machine_tutorials[slide_machine].slides.length + 1;
            let slide_title = this.new_slide_title;
            let slide_image = this.new_slide_image;
            let slide_description = this.new_slide_description;

            // Upload image to server
            let data = new FormData();
            data.append('file', this.new_slide_image);

            let img_request = new XMLHttpRequest();
            img_request.open('post', '/upload-file');
            img_request.addEventListener('load', (e) => {
            });
            img_request.send(data);

            // Create entry in database
            data = new FormData();
            data.append('slide_number', slide_number);
            data.append('slide_machine', slide_machine);
            data.append('slide_title', slide_title);
            data.append('slide_image', "/img/" + this.new_slide_image_name);
            data.append('slide_description', slide_description);
            let entry_request = new XMLHttpRequest();
            entry_request.open('post', '/slides/add');
            entry_request.addEventListener('load', (e) => {
                this.get_machine_list();
                this.get_slide_list();

                this.new_slide_description = "";
                this.new_slide_title = "";
                this.new_slide_image_name = "Fichier";
                this.new_slide_image_render = "";
            });
            entry_request.send(data);
            
        },

        add_new_tutorial: function(){
            this.add_slide(this.new_tutorial_machine, true);
        },

        update_slide: function(slide_id){
            
        },

        processFile: function(event){
            this.new_slide_image = event.target.files[0];
            this.new_slide_image_name = this.new_slide_image.name;

            let reader = new FileReader();
            reader.onload = (e) => {
                this.new_slide_image_render = e.target.result;
            };
            reader.readAsDataURL(this.new_slide_image);
        },

        get_machine_by_id: function(id){
            for(let k = 0; k < this.machine_list.length; k++){
                let machine = this.machine_list[k];
                if(machine.machine_id == id)
                    return machine;
            }
        },

        update_tutorials_list: function(){
            this.machine_tutorials = {};
            this.slide_list.forEach((slide) => {
                if(this.machine_tutorials.hasOwnProperty(slide.slide_machine)){
                    this.machine_tutorials[slide.slide_machine]['slides'].push(slide);
                }
                else {
                    this.machine_tutorials[slide.slide_machine] = {};
                    let machine = this.get_machine_by_id(slide.slide_machine);
                    this.machine_tutorials[slide.slide_machine]['machine_id'] = machine.machine_id;
                    this.machine_tutorials[slide.slide_machine]['machine_name'] = machine.machine_reference + " " + machine.machine_brand;
                    this.machine_tutorials[slide.slide_machine]['slides'] = [slide];
                }
            });
        },

        // Handle edition, open modal and load data
        editCard: function(slide_data){
            this.edit_data = slide_data;
            
            document.querySelector(".table-body").classList.add("modal-open");
            document.querySelector("footer").classList.add("modal-open");
            this.edit_modal = true;
        },

        // Hide modal and remove overflow hidden class
        hideEditCard: function(){
            document.querySelector(".table-body").classList.remove("modal-open");
            document.querySelector("footer").classList.remove("modal-open");
            this.edit_modal = false;
        },

        updateSlide: function(){
            let updateSlideTitle = document.querySelector('input[name="update_slide_title"]');
            let updateSlideDescription = document.querySelector('input[name="update_slide_description]');
            // TODO
        }
    },

    computed: {
        edit_data_slide_img: function(){
            return "slide_img_"+this.edit_data.slide_id.toString();
        }
    },

    mounted: function(){
        this.get_machine_list();
        this.get_slide_list();
    }
})