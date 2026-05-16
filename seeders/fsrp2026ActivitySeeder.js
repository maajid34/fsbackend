import dotenv from "dotenv";
import connectDB from "../config/db.js";

import Component from "../models/Component.js";
import Subcomponent from "../models/Subcomponent.js";
import Location from "../models/Location.js";
import ValueChain from "../models/ValueChain.js";
import Community from "../models/Community.js";
import CommunityGroup from "../models/CommunityGroup.js";
import Activity from "../models/Activity.js";
import Service from "../models/Service.js";

dotenv.config();
await connectDB();

const seed = async () => {
  try {
    console.log("Starting FSRP 2026 activity seed...");

    const component1 = await Component.findOne({ code: /1/i });

    const kismayo = await Location.findOne({ name: /kismayo/i });
    const yontoy = await Location.findOne({ name: /yontoy/i });

    if (!component1) throw new Error("Component 1 not found");
    if (!kismayo && !yontoy) throw new Error("Kismayo/Yontoy location not found");

    const locationYontoy = yontoy || kismayo;
    const locationKismayo = kismayo || yontoy;

    const cropVC = await ValueChain.findOneAndUpdate(
      { name: "Crop Production" },
      {
        name: "Crop Production",
        category: "agriculture",
        description: "Crop production, seed systems, soil testing and climate-smart agriculture",
      },
      { upsert: true, new: true }
    );

    const livestockVC = await ValueChain.findOneAndUpdate(
      { name: "Livestock" },
      {
        name: "Livestock",
        category: "livestock",
        description: "Livestock production, veterinary services and animal health",
      },
      { upsert: true, new: true }
    );

    const communityVC = await ValueChain.findOneAndUpdate(
      { name: "Community Development" },
      {
        name: "Community Development",
        category: "cross_cutting",
        description: "Community facilitation, PICD and institutional strengthening",
      },
      { upsert: true, new: true }
    );

    const yontoyCommunity = await Community.findOneAndUpdate(
      { name: "Yontoy Farming Community" },
      {
        name: "Yontoy Farming Community",
        type: "agricultural",
        location: locationYontoy?._id,
      },
      { upsert: true, new: true }
    );

    const pastoralCommunity = await Community.findOneAndUpdate(
      { name: "Kismayo Pastoral and Agro-Pastoral Community" },
      {
        name: "Kismayo Pastoral and Agro-Pastoral Community",
        type: "pastoral_agro_pastoral",
        location: locationKismayo?._id,
      },
      { upsert: true, new: true }
    );

    const yontoyFarmersGroup = await CommunityGroup.findOneAndUpdate(
      { name: "Yontoy Farmers CIG" },
      {
        name: "Yontoy Farmers CIG",
        group_type: "CIG",
        community: yontoyCommunity._id,
        value_chain: cropVC._id,
      },
      { upsert: true, new: true }
    );

    const pastoralGroup = await CommunityGroup.findOneAndUpdate(
      { name: "Pastoral Producer Group" },
      {
        name: "Pastoral Producer Group",
        group_type: "CIG",
        community: pastoralCommunity._id,
        value_chain: livestockVC._id,
      },
      { upsert: true, new: true }
    );

    const womenLivestockGroup = await CommunityGroup.findOneAndUpdate(
      { name: "Women Livestock VMG" },
      {
        name: "Women Livestock VMG",
        group_type: "VMG",
        community: pastoralCommunity._id,
        value_chain: livestockVC._id,
      },
      { upsert: true, new: true }
    );

    await Activity.deleteMany({ seeded_2026: true });
    await Service.deleteMany({ seeded_2026: true });

    const activities = await Activity.insertMany([
      {
        title: "Rehabilitation/construction of Agriculture Research Satellite Center in Kismayo (Yontoy Village)",
        location: locationYontoy._id,
        component: component1._id,
        value_chain: cropVC._id,
        community: yontoyCommunity._id,
        community_group: yontoyFarmersGroup._id,
        status: "planned",
        start_date: new Date("2026-01-01"),
        end_date: new Date("2026-12-31"),
        evidence: "",
        seeded_2026: true,
      },
      {
        title: "Training of Additional PICD Facilitators",
        location: locationKismayo._id,
        component: component1._id,
        value_chain: communityVC._id,
        community: pastoralCommunity._id,
        community_group: pastoralGroup._id,
        status: "planned",
        start_date: new Date("2026-01-01"),
        end_date: new Date("2026-12-31"),
        evidence: "",
        seeded_2026: true,
      },
      {
        title: "Mass Vaccination and Selective Treatment of Livestock",
        location: locationKismayo._id,
        component: component1._id,
        value_chain: livestockVC._id,
        community: pastoralCommunity._id,
        community_group: pastoralGroup._id,
        status: "planned",
        start_date: new Date("2026-01-01"),
        end_date: new Date("2026-12-31"),
        evidence: "",
        seeded_2026: true,
      },
      {
        title: "Training of Community Animal Health Workers in Selected Districts",
        location: locationKismayo._id,
        component: component1._id,
        value_chain: livestockVC._id,
        community: pastoralCommunity._id,
        community_group: womenLivestockGroup._id,
        status: "planned",
        start_date: new Date("2026-01-01"),
        end_date: new Date("2026-12-31"),
        evidence: "",
        seeded_2026: true,
      },
    ]);

    await Service.insertMany([
      {
        activity: activities[0]._id,
        location: locationYontoy._id,
        component: component1._id,
        value_chain: cropVC._id,
        community: yontoyCommunity._id,
        community_group: yontoyFarmersGroup._id,
        service_type: "construction",
        description: "Agriculture Research Satellite Center rehabilitation/construction",
        unit: "facility",
        quantity: 1,
        date_provided: new Date("2026-12-31"),
        seeded_2026: true,
      },
      {
        activity: activities[1]._id,
        location: locationKismayo._id,
        component: component1._id,
        value_chain: communityVC._id,
        community: pastoralCommunity._id,
        community_group: pastoralGroup._id,
        service_type: "training",
        description: "Training of additional PICD facilitators",
        unit: "people",
        quantity: 0,
        date_provided: new Date("2026-12-31"),
        seeded_2026: true,
      },
      {
        activity: activities[2]._id,
        location: locationKismayo._id,
        component: component1._id,
        value_chain: livestockVC._id,
        community: pastoralCommunity._id,
        community_group: pastoralGroup._id,
        service_type: "vaccination",
        description: "Mass vaccination and selective treatment of livestock",
        unit: "animals",
        quantity: 0,
        date_provided: new Date("2026-12-31"),
        seeded_2026: true,
      },
      {
        activity: activities[3]._id,
        location: locationKismayo._id,
        component: component1._id,
        value_chain: livestockVC._id,
        community: pastoralCommunity._id,
        community_group: womenLivestockGroup._id,
        service_type: "training",
        description: "Training of community animal health workers",
        unit: "people",
        quantity: 0,
        date_provided: new Date("2026-12-31"),
        seeded_2026: true,
      },
    ]);

    console.log("FSRP 2026 activities, value chains, communities, groups and services seeded successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();