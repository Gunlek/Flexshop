let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index').app;

let should = chai.should();

chai.use(chaiHttp);

exports.runParametersTests = function(){
    describe('Parameters', function(){
        describe('/list endpoint', function(){
            it('should not be null and should have result length equal to 0', function(done){
                chai.request(app)
                    .get('/parameters/list')
                    .end((err, res) => {
                        res.body.should.not.equal(null);
                        res.body.length.should.equal(0);

                        done();
                    });
            });
        });

        describe('/add endpoint', function(){
            it('should return status code 201 and add a new parameter', function(done){
                let parameter_data = {
                    parameter_section: 1,
                    parameter_name: "test_name",
                    parameter_value: "test_value"
                };
                chai.request(app)
                    .post('/parameters/add')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(parameter_data)
                    .end((err, res) => {
                        res.status.should.equal(201);
                        chai.request(app)
                            .get('/parameters/list')
                            .end((err, check_res) => {
                                check_res.body.should.not.equal(null);
                                check_res.body.length.should.equal(1);
                                check_res.body[0]['parameter_section'].should.equal(1);
                                check_res.body[0]['parameter_name'].should.equal("test_name");
                                check_res.body[0]['parameter_value'].should.equal("test_value");

                                done();
                            });
                    });
            });
        });

        describe('/get/:id endpoint', function(){
            it('should return a parameter with specified section', function(done){
                chai.request(app)
                    .get('/parameters/get/1')
                    .end((err, res) => {
                        res.status.should.not.equal(204);
                        res.body.should.not.equal(null);
                        res.body['parameter_section'].should.equal(1);
                        res.body['parameter_name'].should.equal("test_name");
                        res.body['parameter_value'].should.equal("test_value");

                        done();
                    });
            });
        });

        describe('/update/:id endpoint', function(){
            it('should update the corresponding parameter', function(done){
                let parameter_data = {
                    parameter_section: 2,
                    parameter_name: "updated_test_name",
                    parameter_value: "updated_test_value"
                };
                chai.request(app)
                    .put('/parameters/update/1')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(parameter_data)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/parameters/get/2')
                            .end((err, check_res) => {
                                check_res.body['parameter_section'].should.equal(2);
                                check_res.body['parameter_name'].should.equal("updated_test_name");
                                check_res.body['parameter_value'].should.equal("updated_test_value");
                                
                                done();
                            });
                    });
            });
        });

        describe('/delete/:id endpoint', function(){
            it('should delete the parameter with specified id', function(done){
                chai.request(app)
                    .delete('/parameters/delete/1')
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/parameters/list')
                            .end((err, res) => {
                                res.body.length.should.equal(0);

                                done();
                            });
                    });
            });
        });
    });
};