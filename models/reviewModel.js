


const reviewModel = (sequelize, DataTypes) => {
    const Review = sequelize.define("review", {
        
        description: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER
        },
        // will not at createAt updateAt Stuff
        // timestamps: false
    });

    return Review;
}

export default reviewModel;

