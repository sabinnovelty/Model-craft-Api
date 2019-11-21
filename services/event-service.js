var eventService = (() => {
  const utility = require("../utility/utility");
  const HttpStatus = require("http-status-codes");
  const EventModel = require("../models/event");
  // var query = {'username':req.user.username};
  // req.newData.username = req.user.username;
  // MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
  //     if (err) return res.send(500, { error: err });
  //     return res.send("succesfully saved");
  // });
  createEvent = event => {
    console.log("create event", event);
    return new Promise(async (resolve, reject) => {
      try {
        const is_image_uploaded = await utility.writeFile(event.eventImage);
        const eventModel = new EventModel({
          title: event.title,
          description: event.description,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          image_name: is_image_uploaded.imageName,
          isActive: true
        });
        if (!eventModel && is_image_uploaded.upload) {
          await utility.unlinkFile(event.eventImage.name);
        }
        const create_event = eventModel.save();
        resolve(create_event);
      } catch (error) {
        if (is_image_uploaded.upload) {
          await utility.unlinkFile(event.eventImage.name);
        }
        reject(error);
      }
    });
  };

  eventList = () => {
    return new Promise(async (resolve, reject) => {
      const event_list = await EventModel.find({}).sort({ start_date: -1 });
      console.log("event list", event_list);
      resolve(event_list);
    });
  };

  updateEvent = async event => {
    const event_info = await EventModel.findById(event._id);
    console.log("update ))))", event);
    return new Promise(async (resolve, reject) => {
      try {
        const is_image_uploaded = await utility.writeFile(event.eventImage);
        console.log("update image uplodate", is_image_uploaded);
        if (is_image_uploaded.upload) {
          const event_info = await EventModel.findById(event._id);
          console.log("image uploaded ***", event_info);
          await utility.unlinkFile(event_info.image_name);
        }

        const update_event = await EventModel.update(
          { _id: event._id },
          {
            $set: {
              title: event.title,
              description: event.description,
              location: event.location,
              startDate: event.startDate,
              endDate: event.endDate,
              image_name: is_image_uploaded.imageName,
              isActive: event.isActive
            }
          }
        );
        console.log("updated event", update_event);
        resolve(true);
      } catch (error) {}
    });
  };

  return {
    createEvent: createEvent,
    eventList: eventList,
    updateEvent: updateEvent
  };
})();

module.exports = eventService;
