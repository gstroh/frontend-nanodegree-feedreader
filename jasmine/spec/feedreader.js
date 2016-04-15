/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('All RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            expect(allFeeds instanceof Array).toBeTruthy();
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("each URL defined and not empty", function() {
            allFeeds.forEach(function(eachFeed) {
                expect(eachFeed.url).toBeDefined();
                expect(eachFeed.url.length).not.toBe(0);
            });
          });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it("each feed has name and not empty", function() {
            allFeeds.forEach(function(eachFeed) {
                expect(eachFeed.name).toBeDefined();
                expect(eachFeed.name.length).not.toBe(0);
                expect(typeof eachFeed.name).toBe("string");
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {

        // document body used in both specs
        var documentBody = document.body;
        //console.log("document.body = ", documentBody);

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it("element hidden by default", function() {
            expect(documentBody.className).toContain("menu-hidden");
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it("changes visibility when menu icon clicked", function() {
            var menuIconLink = document.querySelector(".menu-icon-link");
            menuIconLink.click();
            expect(documentBody.className).not.toContain("menu-hidden");

            menuIconLink.click();
            expect(documentBody.className).toContain("menu-hidden");
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        // Jasmine beforeEach and done() function
        // to handle asynchronous call.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        it("loadFeed function completes and at least one entry element in feed container", function(done) {
            var documentFeed = document.querySelector(".feed");
            var nEntry = documentFeed.getElementsByClassName("entry").length;
            expect(nEntry).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        // Jasmine beforeEach and done() function
        // to handle asynchronous call.
        var originalFeedSelection;
        beforeEach(function(done) {
            loadFeed(0, function() {
                originalFeedSelection = document.querySelector(".feed").innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it("content actually changes", function(done) {
            var newFeedSelection = document.querySelector(".feed").innerHTML;
            expect(originalFeedSelection).not.toBe(newFeedSelection);
            done();
        });
    });

}());
