class ResourceCreatedSuccess {
    constructor(res) {
        this.statusCode = 201
        this.message = "Resource Created Successfully"
        this.body = res;
    }
}

class ResourceUpdatedSuccess {
    constructor(res) {
        this.statusCode = 201
        this.message = "Resource Updated Successfully"
        this.body = res
    }
}

class ResourceDeletedSuccess {
    constructor() {
        this.statusCode = 201
        this.message = "Resource Deleted Successfully"
    }
}

class UserCreatedSuccess {
    constructor() {
        this.statusCode = 201
        this.message = "User Created Successfully"
    }
}

module.exports = {
    ResourceCreatedSuccess,
    ResourceDeletedSuccess,
    UserCreatedSuccess,
    ResourceUpdatedSuccess,
}