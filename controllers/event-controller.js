const router = require("express").Router();
const httpResonse = require("../common/http-response");
const eventService = require("../services/event-service");

router.post("/create", (req, res) => {
  const eventImage = req.files ? req.files.file : null;
  req.body["eventImage"] = eventImage;
  if (req.body["_id"] !== "undefined") {
    console.log("update ******************", req.body);
    try {
      eventService.updateEvent(req.body).then(event_update => {
        httpResonse.success(res, Object.assign(req.body, { update: true }));
      });
    } catch (error) {
      httpResonse.errorHandler(res, error);
    }
  } else {
    eventService
      .createEvent(req.body)
      .then(event => {
        console.log("create event", event);
        httpResonse.success(res, Object.assign(event, { create: true }));
      })
      .catch(error => {
        httpResonse.errorHandler(res, error);
      });
  }
});

router.put("/", (req, res) => {
  console.log("update event", req.files);
  const eventImage = req.files ? req.files.file : null;
  req.body["eventImage"] = eventImage;
  try {
    eventService.updateEvent(req.body).then(event_update => {
      httpResonse.success(res, { success: true });
    });
  } catch (error) {
    httpResonse.errorHandler(res, error);
  }
});

router.get("/list", (req, res) => {
  const path = require("path");
  let image_path = path.join(__dirname, "../", "assests", "images", "event");
  console.log(image_path);
  eventService
    .eventList()
    .then(eventlist => {
      let map_event_list = eventlist.map(x => {
        return {
          _id: x._id,
          title: x.title,
          description: x.description,
          location: x.location,
          startDate: x.start_date,
          endDate: x.end_date,
          image_name: x.image_name,
          isActive: x.isActive,
          imageName: x.image_name,
          imagePath: `${image_path}/${x.image_name}`
        };
      });
      console.log("map", map_event_list);
      httpResonse.success(res, map_event_list);
    })
    .catch(error => {
      httpResonse.errorHandler(res, error);
    });
});

module.exports = router;
