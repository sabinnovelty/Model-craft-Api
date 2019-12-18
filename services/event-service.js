var eventService = (() => {
  const utility = require("../utility/utility");
  const HttpStatus = require("http-status-codes");
  const EventModel = require("../models/event");

  createEvent = event => {
    return new Promise(async (resolve, reject) => {
      try {
        const is_image_uploaded = await utility.writeFile(event.eventImage, 'event');
        const eventModel = new EventModel({
          title: event.title,
          description: event.description,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          image_name: is_image_uploaded.imageName,
          isActive: true,
          featured: false
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
      try {
        const event_list = await EventModel.find({}).sort({ start_date: -1 });
        resolve(event_list);
      } catch (error) {
        reject(error);
      }
    });
  };
  // Date.now() + "_" + event.eventImage.name,
  updateEvent = async event => {
    return new Promise(async (resolve, reject) => {
      if (event.eventImage) {
        const is_image_uploaded = await utility.writeFile(event.eventImage, 'event');
        if (is_image_uploaded.upload) {
          const find_event = await EventModel.findById(event._id);
          await utility.unlinkFile(find_event.image_name);
          EventModel.findById(event._id).then(result => {
            result.title = event.title;
            result.description = event.description;
            result.location = event.location;
            result.startDate = event.startDate;
            result.endDate = event.endDate;
            result.image_name = is_image_uploaded.imageName;
            result.isActive = event.isActive;
            result.save().then(success => {
              resolve(success)
            })
          })

        } else {
          reject({ message: 'Internal Server error' })
        }
      } else {
        EventModel.findById(event._id).then(result => {
          result.title = event.title;
          result.description = event.description;
          result.location = event.location;
          result.startDate = event.startDate;
          result.endDate = event.endDate;
          result.image_name = result.image_name;
          result.isActive = event.isActive;
          result.save().then(success => {
            resolve(success)

          })
        })
      }
    })

  };

  getEventById = id => {
    return new Promise(async (resolve, reject) => {
      try {
        const event = await EventModel.findById(id);
        resolve(event);
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteEventById = (id) => {
    return EventModel.deleteEventById(id)
  }

  getLatestEvent = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const event_list = await EventModel.find({}).sort({ createdAt: -1 });
        resolve(event_list[0])
      } catch (error) {
        reject(error)
      }

    })
  }

  return {
    createEvent: createEvent,
    eventList: eventList,
    updateEvent: updateEvent,
    getEventById: getEventById,
    getLatestEvent: getLatestEvent
  };
})();

module.exports = eventService;
