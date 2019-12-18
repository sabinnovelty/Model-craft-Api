const router = require("express").Router();
const httpResonse = require("../common/http-response");
const service = require("../services/services");
const path = require("path");


router.post("/create", (req, res) => {
    let image_path = path.join(__dirname, "../", "assests", "images", "event");
    const serviceImage = req.files ? req.files.file : null;
    req.body["serviceImage"] = serviceImage;
    service
        .createService(req.body)
        .then(service => {
            console.log('service created controller', service)
            httpResonse.success(
                res,
                Object.assign(service, {
                    create: true,
                    imagePath: `${image_path}/${service.image_name}`
                })
            );
        })
        .catch(error => {
            httpResonse.errorHandler(res, error);
        });
});

router.put("/", (req, res) => {
    const eventImage = req.files ? req.files.file : null;
    req.body["eventImage"] = eventImage;
    try {
        eventService.updateEvent(req.body).then(event_update => {
            httpResonse.success(res, event_update);
        });
    } catch (error) {
        httpResonse.errorHandler(res, error);
    }
});

router.get("/list", (req, res) => {
    let image_path = 'assests/images/service'
    service
        .serviceList()
        .then(eventlist => {
            let map_event_list = eventlist.map(x => {
                return {
                    _id: x._id,
                    title: x.title,
                    description: x.description,
                    image_name: x.image_name,
                    imagePath: `${image_path}/${x.image_name}`
                };
            });
            httpResonse.success(res, map_event_list);
        })
        .catch(error => {
            httpResonse.errorHandler(res, error);
        });
});

router.get('/new', (req, res) => {
    let image_path = 'assests/images/event'
    eventService.getLatestEvent().then(result => {
        httpResonse.success(res, result);

    }).catch(error => {
        httpResonse.errorHandler(res, error);
    })
})



module.exports = router;
