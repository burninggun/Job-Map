$(document).ready(initializeApp);
function initializeApp(){
    attachEventHandlers();
}

function attachEventHandlers(){
    $('#jSearch').click( () => {
        if( $('#jTitle').val()===''){
            tooltipShow('.jobTitleTooltip');
        }
        if( $('#jLocal').val()==''){
            tooltipShow('.jobLocationTooltip');
        }
        if ($('#jLocal').val()!=='' &&  $('#jTitle').val()!=='' ){
            newSearch($('#jTitle').val(), $('#jLocal').val());
            landingHide();
        }

    });
    $('#headerSearch').click( () => {
        newSearch($('#jTitleHeader').val(), $('#jLocalHeader').val());
    });
    $('.inner').click(makeMenuSpin);
    $('.item1').click(jobListMenuToggle);
    $('.item4').click(jobStatsMenuToggle);
}
var placesData = [];
var findJobs = null;

function newSearch(title, location){
    findJobs = new startSearch(title, location);
}

class startSearch{
    constructor(title, location) {
        this.title = title;
        this.location = location;
        //Start the api promise chain

        //HARD CODE SECTION FROM HERE TO ************ REMOVE AFTER WE GO LIVE
        this.jobData = hardCodeResults;
        setTimeout(function(){
            (cleanAndPopulateMarkers()).then(resultOfMarkers => {
                mapPlacesToJobData();
                renderAllMarkers();
                populateJobDisplay();
                console.log('After populateMarkers: no problems with markers', resultOfMarkers);
            }).catch(error => console.log('PROMISE CHAIN ERROR: ', error));
        }, 300);
    }
        //****************************************************************
        //FROM here to ##### IS OUR API ADZUNA CODE TO IMPLEMENT FOR LIVE
        //     this.jobData = {};
        //    this.getJobData().then(resultData => {
        //        this.jobData = resultData;
        //         console.log('jobData is: ', this.jobData)
        //     return cleanAndPopulateMarkers();
        //    }).then(resultOfMarkers =>{
        //        mapPlacesToJobData();
        //        renderAllMarkers();
        //        populateJobDisplay();
        //        console.log('After populateMarkers: no problems with markers', resultOfMarkers);
        //    })
        // .catch(error => console.log('PROMISE CHAIN ERROR: ', error));
    // }
        //##############################################################
    getJobData(){
        return new Promise(function(resolve, reject){
            var where = 'irvine'; //Placeholders, Will be changed later.
            var what = 'javascript developer'; //Placeholders, Will be changed later.
            var ajaxConfig = {
                dataType: 'json',
                url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
                data: {
                    app_id: '087b8936',
                    app_key: 'aa9f2f16c163aba979e6fb42412f734a',
                    what: what, //Placeholders, Will be changed later.
                    where: where, //Placeholders, Will be changed later.
                    'content-type': 'application/json',
                    results_per_page: 20
                },
                method: 'GET',
                success: function (result) {
                    resolve(result);
                },
                error: function (result) {
                    reject(result);
                    console.log('Error: had trouble getting data from server', result);

                }
            }
            $.ajax(ajaxConfig);
        });
    }
}
