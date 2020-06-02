let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index').app;

let should = chai.should();

chai.use(chaiHttp);

exports.runCategoriesTests = function(){
    describe('Categories', function(){
        describe('/list endpoint', function(){
            it('should not be null and should have result length equal to 0', function(done){
                chai.request(app)
                    .get('/category/list')
                    .end((err, res) => {
                        res.body.should.not.equal(null);
                        res.body.length.should.equal(0);

                        done();
                    });
            });
        });

        describe('/add endpoint', function(){
            it('should return status code 201 and add a new category', function(done){
                let category_data = {
                    category_title: "test_category",
                    category_workshop: 1
                };
                chai.request(app)
                    .post('/category/add')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(category_data)
                    .end((err, res) => {
                        res.status.should.equal(201);
                        chai.request(app)
                            .get('/category/list')
                            .end((err, check_res) => {
                                check_res.body.should.not.equal(null);
                                check_res.body.length.should.equal(1);
                                check_res.body[0]['category_title'].should.equal("test_category");
                                check_res.body[0]['category_workshop'].should.equal(1);

                                done();
                            });
                    });
            });
        });

        describe('/get/:id endpoint', function(){
            it('should return a category with specified id', function(done){
                chai.request(app)
                    .get('/category/get/1')
                    .end((err, res) => {
                        res.status.should.not.equal(204);
                        res.body.should.not.equal(null);
                        res.body['category_title'].should.equal("test_category");
                        res.body['category_workshop'].should.equal(1);

                        done();
                    });
            });
        });

        describe('/update/:id endpoint', function(){
            it('should update the corresponding category', function(done){
                let category_data = {
                    category_title: "updated_test_category",
                    category_workshop: 2
                }
                chai.request(app)
                    .put('/category/update/1')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(category_data)
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/category/get/1')
                            .end((err, check_res) => {
                                check_res.body['category_title'].should.equal("updated_test_category");
                                check_res.body['category_workshop'].should.equal(2);
                                
                                done();
                            });
                    });
            });
        });

        describe('/delete/:id endpoint', function(){
            it('should delete the category with specified id', function(done){
                chai.request(app)
                    .delete('/category/delete/1')
                    .end((err, res) => {
                        res.status.should.equal(200);
                        chai.request(app)
                            .get('/category/list')
                            .end((err, res) => {
                                res.body.length.should.equal(0);

                                done();
                            });
                    });
            });
        });
    });
};