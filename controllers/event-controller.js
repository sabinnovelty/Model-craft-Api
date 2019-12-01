const router = require("express").Router();
const httpResonse = require("../common/http-response");
const eventService = require("../services/event-service");
const path = require("path");

router.post("/create", (req, res) => {
  let image_path = path.join(__dirname, "../", "assests", "images", "event");
  const eventImage = req.files ? req.files.file : null;
  req.body["eventImage"] = eventImage;
  eventService
    .createEvent(req.body)
    .then(event => {
      httpResonse.success(
        res,
        Object.assign(event, {
          create: true,
          imagePath: `${image_path}/${event.image_name}`
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
  console.log('update event file called **', req.body)
  try {
    eventService.updateEvent(req.body).then(event_update => {
      httpResonse.success(res, { success: true });
    });
  } catch (error) {
    httpResonse.errorHandler(res, error);
  }
});

router.get("/list", (req, res) => {
  let image_path = 'assests/images/event'
  eventService
    .eventList()
    .then(eventlist => {
      let map_event_list = eventlist.map(x => {
        return {
          _id: x._id,
          title: x.title,
          description: x.description,
          location: x.location,
          startDate: x.startDate,
          endDate: x.endDate,
          image_name: x.image_name,
          isActive: x.isActive,
          imageName: x.image_name,
          imagePath: `${image_path}/${x.image_name}`
        };
      });
      httpResonse.success(res, map_event_list);
    })
    .catch(error => {
      httpResonse.errorHandler(res, error);
    });
});

router.get("/:id", (req, res) => {
  const event_id = req.params.id;

  try {
    eventService.getEventById(event_id).then(event => {
      httpResonse.success(res, { data: event });
    });
  } catch (error) {
    httpResonse.errorHandler(res, error);
  }
});

module.exports = router;
