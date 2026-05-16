import dotenv from "dotenv";
import connectDB from "../config/db.js";

import Activity from "../models/Activity.js";
import Service from "../models/Service.js";

dotenv.config();
await connectDB();

const activityServiceMap = [
  {
    activityKey: "Satellite Center",
    services: [
      ["site_identification", "identification of one satellite research center site.", "site", 1, "Q1"],
      ["technical_assessment", "Technical needs assessment for the identified site", "assessment", 1, "Q1"],
      ["environmental_screening", "Site ES Screening and ESMP Preparation", "report", 1, "Q1"],
      ["training", "Training Contractors on ESS10, ESS1, ESS4 and ESS8", "people", 0, "Q2"],
      ["construction", "construction of the satellite center", "facility", 1, "Q2-Q3"],
    ],
  },
  {
    activityKey: "PICD",
    services: [
      ["curriculum_development", "Develop PICD training curriculum and materials", "curriculum", 1, "Q2"],
      ["training", "Conduct PICD Training of Facilitators (ToF)", "people", 45, "Q2"],
    ],
  },
  {
    activityKey: "vaccination",
    services: [
      ["surveillance", "Conduct surveillance assessment", "assessment", 1, "Q1"],
      ["procurement", "Procure veterinary vaccines, drugs, cold chain equipment and CAHWs kits", "kits", 1, "Q1"],
      ["vaccination", "Implement vaccination program", "animals", 900000, "Q2-Q3"],
    ],
  },
  {
    activityKey: "animal health workers",
    services: [
      ["curriculum_development", "Develop training curriculum and materials for CAHWs", "curriculum", 1, "Q2"],
      ["training", "Conduct CAHWs training", "people", 90, "Q2"],
    ],
  },
  {
    activityKey: "FFS",
    services: [
      ["curriculum_development", "Develop FFS/PFS training curriculum and materials", "curriculum", 1, "Q3"],
      ["training", "Conduct FFS/PFS Facilitators ToF", "people", 36, "Q3"],
    ],
  },
  {
    activityKey: "Community committees",
    services: [
      ["capacity_building", "Formation and capacity building of irrigation canal and water harvesting management committees", "committees", 238, "Q1-Q4"],
    ],
  },
];

const seed = async () => {
  try {
    console.log("Starting service seed...");

    await Service.deleteMany({ seeded_2026: true });

    for (const item of activityServiceMap) {
      const activity = await Activity.findOne({
        title: { $regex: item.activityKey, $options: "i" },
      });

      if (!activity) {
        console.log(`Activity not found for key: ${item.activityKey}`);
        continue;
      }

      const serviceLocation =
        activity.location ||
        activity.locations?.[0] ||
        null;

      if (!serviceLocation) {
        console.log(`Skipped services: activity has no location - ${activity.title}`);
        continue;
      }

      for (const [service_type, description, unit, quantity, timeline] of item.services) {
        await Service.create({
          activity: activity._id,
          location: serviceLocation,

          component: activity.component || null,
          subcomponent: activity.subcomponent || null,
          value_chain: activity.value_chain || null,
          community: activity.community || null,
          community_group: activity.community_group || null,

          service_type,
          description,
          unit,
          quantity,
          timeline,

          date_provided: new Date("2026-12-31"),
          statusApproval: "pending",
          seeded_2026: true,
        });

        console.log(`Created service: ${service_type} → ${activity.title}`);
      }
    }

    console.log("Service seeding completed successfully.");
    process.exit();
  } catch (error) {
    console.error("Service seeding failed:", error);
    process.exit(1);
  }
};

seed();