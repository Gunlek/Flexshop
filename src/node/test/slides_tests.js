let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index').app;

let should = chai.should();

chai.use(chaiHttp);

exports.runSlidesTests = function(){
    describe('Slides', function(){
        describe('/list endpoint', function(){
            it('should not be null and should have result length equal to 0', function(done){
                chai.request(app)
                    .get('/slides/list')
                    .end((err, res) => {
                        res.body.should.not.equal(null);
                        res.body.length.should.equal(0);

                        done();
                    });
            });
        });

        describe('/add endpoint', function(){
            it('should return status code 201 and add a new slide', function(done){
                let slide_data = {
                    slide_number: 1,
                    slide_machine: 1,
                    slide_title: "test_title",
                    slide_image: "test_image",
                    slide_description: "test_description"
                };
                chai.request(app)
                    .post('/slides/add')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(slide_data)
                    .end((err, res) => {
                        res.status.should.equal(201);
                        chai.request(app)
                            .get('/slides/list')
                            .end((err, check_res) => {
                                check_res.body.should.not.equal(null);
                                check_res.body.length.should.equal(1);
                                check_res.body[0]['slide_number'].should.equal(1);
                                check_res.body[0]['slide_machine'].should.equal(1);
                                check_res.body[0]['slide_title'].should.equal("test_title");
                                check_res.body[0]['slide_image'].should.equal("test_image");
                                check_res.body[0]['slide_description'].should.equal("test_description");

                                done();
                            });
                    });
            });
        });

        describe('/get/:id endpoint', function(){
            it('should return a slide with specified id', function(done){
                chai.request(app)
                    .get('/slides/get/1')
                    .end((err, res) => {
                        res.status.should.not.equal(204);
                        res.body.should.not.equal(null);
                        res.body['slide_number'].should.equal(1);
                        res.body['slide_machine'].should.equal(1);
                        res.body['slide_title'].should.equal("test_title");
                        res.body['slide_image'].should.equal("test_image");
                        res.body['slide_description'].should.equal("test_description");

                        done();
                    });
            });
        });

        describe('/update/:id endpoint', function(){
            it('should update the corresponding slide', function(done){
                let slide_data = {
                    slide_number: 2,
                    slide_machine: 2,
                    slide_title: "updated_test_title",
                    slide_image: "updated_test_image",
                    slide_description: "updated_test_description"
                };
                chai.request(app)
                    .put('/slides/update/1')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(slide_data)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/slides/get/1')
                            .end((err, check_res) => {
                                check_res.body['slide_number'].should.equal(2);
                                check_res.body['slide_machine'].should.equal(2);
                                check_res.body['slide_title'].should.equal("updated_test_title");
                                check_res.body['slide_image'].should.equal("updated_test_image");
                                check_res.body['slide_description'].should.equal("updated_test_description");
                                
                                done();
                            });
                    });
            });
        });

        describe('/delete/:id endpoint', function(){
            it('should delete the slide with specified id', function(done){
                chai.request(app)
                    .delete('/slides/delete/1')
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/slides/list')
                            .end((err, res) => {
                                res.body.length.should.equal(0);

                                done();
                            });
                    });
            });
        });
    });
};