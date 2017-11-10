// Attempt at unit testing for Project

var expect = require("chai").expect;
var request = require("request");

describe("Searching", function () {
    describe("all users", function () {
        var url = "http://localhost:3000/users?";
        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe("ID #1", function(){
    	var url = "http://localhost:3000/users?id=1";
    	it("returns user #1", function (done){
    		request(url, function (error, response, body){
    			expect(body).to.equal('<!DOCTYPE html><html><head><title>Users</title><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script><script src="users.js" type="text/javascript"></script><link href="users.css" rel="stylesheet" type="text/css"><link rel="title icon" type="image/png" href="https://www.hey.fr/tools/emoji/ios_emoji_smiling_face_with_open_mouth_and_smiling_eyes.png"></head><body><h3>Here are the users that matched your search!</h3><p>(Click table headers to re-order)</p><table><tr><th id="byID">ID</th><th id="byName">Name</th><th id="byAge">Age</th><th id="byLocation">Location</th></tr><!-- For each row (called user) in rows (the array)--><tr><td>1</td><td>Chloe</td><td id="age">19</td><td>New York City</td></tr></table><p></p><button id="returnHome" type="button">Return to Home</button></body></html>');
    			done();
    		});
    	});
    });
});

describe("Testing", function(){
	it("should complete", function (){
		return expect(Promise.resolve(3)).should.eventually.equal([4, 5, 6].length);
	});
	it("should equal", function(){
		return Promise.resolve(3*3).should.eventually.equal(4+5);
	});
});
