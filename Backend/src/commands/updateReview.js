class UpdateReviewCommand {
    constructor(service, reviewId, reviewData) {
        this.service = service;
        this.reviewId = reviewId;
        this.reviewData = reviewData;
    }

    async execute() {
        return await this.service.updateResenia(this.reviewId, this.reviewData);
    }
}

module.exports = { UpdateReviewCommand };