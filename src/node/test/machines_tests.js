let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index').app;

let should = chai.should();

chai.use(chaiHttp);

exports.runMachinesTests = function(){
    describe('Machines', function(){
        describe('/list endpoint', function(){
            it('should not be null and should have result length equal to 0', function(done){
                chai.request(app)
                    .get('/machines/list')
                    .end((err, res) => {
                        res.body.should.not.equal(null);
                        res.body.length.should.equal(0);

                        done();
                    });
            });
        });

        describe('/add endpoint', function(){
            it('should return status code 201 and add a new machine', function(done){
                let machine_data = {
                    machine_title: "test_machine",
                    machine_category: 1,
                    machine_brand: "test_brand",
                    machine_image: "test_image",
                    machine_reference: "test_reference",
                };
                chai.request(app)
                    .post('/machines/add')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(machine_data)
                    .end((err, res) => {
                        res.status.should.equal(201);
                        chai.request(app)
                            .get('/machines/list')
                            .end((err, check_res) => {
                                check_res.body.should.not.equal(null);
                                check_res.body.length.should.equal(1);
                                check_res.body[0]['machine_title'].should.equal("test_machine");
                                check_res.body[0]['machine_category'].should.equal(1);
                                check_res.body[0]['machine_brand'].should.equal("test_brand");
                                check_res.body[0]['machine_image'].should.equal("test_image");
                                check_res.body[0]['machine_reference'].should.equal("test_reference");

                                done();
                            });
                    });
            });
        });

        describe('/get/:id endpoint', function(){
            it('should return a machine with specified id', function(done){
                chai.request(app)
                    .get('/machines/get/1')
                    .end((err, res) => {
                        res.status.should.not.equal(204);
                        res.body.should.not.equal(null);
                        res.body['machine_title'].should.equal("test_machine");
                        res.body['machine_category'].should.equal(1);
                        res.body['machine_brand'].should.equal("test_brand");
                        res.body['machine_image'].should.equal("test_image");
                        res.body['machine_reference'].should.equal("test_reference");

                        done();
                    });
            });
        });

        describe('/update/:id endpoint', function(){
            it('should update the corresponding machine', function(done){
                let machine_data = {
                    machine_title: "updated_test_machine",
                    machine_category: 2,
                    machine_brand: "updated_test_brand",
                    machine_image: "updated_test_image",
                    machine_reference: "updated_test_reference",
                };
                chai.request(app)
                    .put('/machines/update/1')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(machine_data)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/machines/get/1')
                            .end((err, check_res) => {
                                check_res.body['machine_title'].should.equal("updated_test_machine");
                                check_res.body['machine_category'].should.equal(2);
                                check_res.body['machine_brand'].should.equal("updated_test_brand");
                                check_res.body['machine_image'].should.equal("updated_test_image");
                                check_res.body['machine_reference'].should.equal("updated_test_reference");
                                
                                done();
                            });
                    });
            });
        });

        describe('/delete/:id endpoint', function(){
            it('should delete the machine with specified id', function(done){
                chai.request(app)
                    .delete('/machines/delete/1')
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/machines/list')
                            .end((err, res) => {
                                res.body.length.should.equal(0);

                                done();
                            });
                    });
            });
        });
    });
};