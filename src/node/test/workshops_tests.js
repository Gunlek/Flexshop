let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index').app;

let should = chai.should();

chai.use(chaiHttp);

exports.runWorkshopsTests = function(){
    describe('Workshops', function(){
        describe('/list endpoint', function(){
            it('should not be null and should have result length equal to 0', function(done){
                chai.request(app)
                    .get('/workshops/list')
                    .end((err, res) => {
                        res.body.should.not.equal(null);
                        res.body.length.should.equal(0);

                        done();
                    });
            });
        });

        describe('/add endpoint', function(){
            it('should return status code 201 and add a new workshop', function(done){
                let workshop_data = {
                    workshop_title: "test_workshop",
                    workshop_image: "none"
                };
                chai.request(app)
                    .post('/workshops/add')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(workshop_data)
                    .end((err, res) => {
                        res.status.should.equal(201);
                        chai.request(app)
                            .get('/workshops/list')
                            .end((err, check_res) => {
                                check_res.body.should.not.equal(null);
                                check_res.body.length.should.equal(1);
                                check_res.body[0]['workshop_title'].should.equal("test_workshop");
                                check_res.body[0]['workshop_image'].should.equal("none");

                                done();
                            });
                    });
            });
        });

        describe('/get/:id endpoint', function(){
            it('should return a workshop with specified id', function(done){
                chai.request(app)
                    .get('/workshops/get/1')
                    .end((err, res) => {
                        res.status.should.not.equal(204);
                        res.body.should.not.equal(null);
                        res.body['workshop_title'].should.equal("test_workshop");
                        res.body['workshop_image'].should.equal("none");

                        done();
                    });
            });
        });

        describe('/update/:id endpoint', function(){
            it('should update the corresponding workshop', function(done){
                let workshop_data = {
                    workshop_title: "updated_test_workshop",
                    workshop_image: "updated_none"
                }
                chai.request(app)
                    .put('/workshops/update/1')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(workshop_data)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/workshops/get/1')
                            .end((err, check_res) => {
                                check_res.body['workshop_title'].should.equal("updated_test_workshop");
                                check_res.body['workshop_image'].should.equal("updated_none");
                                
                                done();
                            });
                    });
            });
        });

        describe('/delete/:id endpoint', function(){
            it('should delete the workshop with specified id', function(done){
                chai.request(app)
                    .delete('/workshops/delete/1')
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/workshops/list')
                            .end((err, res) => {
                                res.body.length.should.equal(0);

                                done();
                            });
                    });
            });
        });
    });
};