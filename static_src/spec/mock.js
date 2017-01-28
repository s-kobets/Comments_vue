const sinon = require('"imports?this=>global!./node_modules/sinon/lib/sinon.js"');

let FakeServer = {};

FakeServer.prototype.setUp = function () {
	this.server = sinon.fakeServer.create();
};

FakeServer.prototype.tearDown = function () {
		this.server.restore();
	},

FakeServer.prototype["test should fetch comments from server"] = function () {
	this.server.respondWith("GET", "/some/article/comments.json",
		[200, { "Content-Type": "application/json" },
		 '[{ "id": 12, "comment": "Hey there" }]']);

	var callback = sinon.spy();
	myLib.getCommentsFor("/some/article", callback);
	this.server.respond();

	sinon.assert.calledWith(callback, [{ id: 12, comment: "Hey there" }]);
}

export default FakeServer;
