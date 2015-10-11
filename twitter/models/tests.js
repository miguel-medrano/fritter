/*
TEST PARTITIONS
(TESTED VISUALLY FOR NOW...)
    FindByUsername
        existingUser
        missingUser
    verifyUser
        existingUser
            validUsername
                validPassword
                invalidPassword
        missingUser
    createNewUser
        username
            existingUsername
            nonExistingUsername
    getAllTweets
        noTweets
        oneTweet
        manyTweets
    getTweet
        nonExistent
        existent
    addTweet
        nonExistent user
            noContent
            withContent
        existent User
            noContent
            withContent
     removeTweet
        existentUser
            existentTweet
            nonExistentTweet
        nonexistentUser
            existentTweet
            nonExistentTweet

 */

QUnit.test( "Test1", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "Test2", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "Test3", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "Test4", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "Test5", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});