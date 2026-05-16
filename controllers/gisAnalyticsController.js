import Location from "../models/Location.js";
import Beneficiary from "../models/Beneficiary.js";
import Activity from "../models/Activity.js";
import Service from "../models/Service.js";
import IndicatorResult from "../models/IndicatorResult.js";

export const getGISAnalytics = async (req, res) => {
  try {
    const locations = await Location.find()
      .populate("district", "name code")
      .sort({ name: 1 });

    const mapData = [];

    for (const location of locations) {
      const beneficiaries = await Beneficiary.countDocuments({
        location: location._id,
      });

      const activities = await Activity.countDocuments({
        location: location._id,
      });

      const completedActivities = await Activity.countDocuments({
        location: location._id,
        status: "completed",
      });

      const services = await Service.countDocuments({
        location: location._id,
      });

      const serviceQuantity = await Service.aggregate([
        { $match: { location: location._id } },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      mapData.push({
        location_id: location._id,
        name: location.name,
        type: location.type,
        district: location.district?.name || "-",
        district_code: location.district?.code || "-",
        latitude: location.latitude,
        longitude: location.longitude,
        beneficiaries,
        activities,
        completedActivities,
        services,
        serviceQuantity: serviceQuantity[0]?.total || 0,
      });
    }

    const indicatorResults = await IndicatorResult.find()
      .populate("community", "name")
      .populate("component", "code name")
      .sort({ createdAt: -1 });

    res.json({
      totalLocations: locations.length,
      mapData,
      indicatorResults,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};