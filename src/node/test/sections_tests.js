let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index').app;

let should = chai.should();

chai.use(chaiHttp);

exports.runSectionsTests = function(){
    describe('Sections', function(){
        describe('/list endpoint', function(){
            it('should not be null and should have result length equal to 0', function(done){
                chai.request(app)
                    .get('/sections/list')
                    .end((err, res) => {
                        res.body.should.not.equal(null);
                        res.body.length.should.equal(0);

                        done();
                    });
            });
        });

        describe('/add endpoint', function(){
            it('should return status code 201 and add a new section', function(done){
                let section_data = {
                    section_machine: 1,
                    section_type: "test_type"
                };
                chai.request(app)
                    .post('/sections/add')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(section_data)
                    .end((err, res) => {
                        res.status.should.equal(201);
                        chai.request(app)
                            .get('/sections/list')
                            .end((err, check_res) => {
                                check_res.body.should.not.equal(null);
                                check_res.body.length.should.equal(1);
                                check_res.body[0]['section_machine'].should.equal(1);
                                check_res.body[0]['section_type'].should.equal("test_type");

                                done();
                            });
                    });
            });
        });

        describe('/get/:id endpoint', function(){
            it('should return a section with specified id', function(done){
                chai.request(app)
                    .get('/sections/get/1')
                    .end((err, res) => {
                        res.status.should.not.equal(204);
                        res.body.should.not.equal(null);
                        res.body['section_machine'].should.equal(1);
                        res.body['section_type'].should.equal("test_type");

                        done();
                    });
            });
        });

        describe('/update/:id endpoint', function(){
            it('should update the corresponding section', function(done){
                let section_data = {
                    section_machine: 2,
                    section_type: "updated_test_type"
                };
                chai.request(app)
                    .put('/sections/update/1')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(section_data)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/sections/get/1')
                            .end((err, check_res) => {
                                check_res.body['section_machine'].should.equal(2);
                                check_res.body['section_type'].should.equal("updated_test_type");
                                
                                done();
                            });
                    });
            });
        });

        describe('/delete/:id endpoint', function(){
            it('should delete the section with specified id', function(done){
                chai.request(app)
                    .delete('/sections/delete/1')
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/sections/list')
                            .end((err, res) => {
                                res.body.length.should.equal(0);

                                done();
                            });
                    });
            });
        });
    });
};