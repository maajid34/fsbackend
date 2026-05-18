import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";

import Workplan from "../models/Workplan.js";
import Component from "../models/Component.js";
import Subcomponent from "../models/Subcomponent.js";

dotenv.config();

await connectDB();

const workplans = [
  {
    component_code: "1",
    component_name:
      "Restore Agricultural and Pastoral Production",

    subcomponent_code: "1.1",
    subcomponent_name:
      "Resilient Agri-Livestock Research Extension and Seed Systems",

    workplan_no: 1,

    milestone:
      "Rehabilitation/construction of Agriculture Research Satellite Center in Kismayo (Yontoy) Village",

    output:
      "One Agriculture Research Satellite Center rehabilitated/constructed and fully operational in Kismayo (Yontoy Village).",

    quarter: "Q1-Q4",

    timeline: "Q1-Q4",

    responsible: "MOA/SPCU",

    budget_information: "",

    status: "planned",

    remarks: "",

    activity_subactivities: [
      {
        title:
          "Identification of one satellite research center site",
        timeline: "Q1",
        responsible: "MOA/SPCU",
        projected_cost: 5200,
      },

      {
        title:
          "Technical needs assessment for identified site",
        timeline: "Q1",
        responsible: "MOA/SPCU",
        projected_cost: 42000,
      },

      {
        title:
          "Site ES Screening and ESMP Preparation",
        timeline: "Q1",
        responsible: "MOA/SPCU",
        projected_cost: 4000,
      },

      {
        title:
          "Training Contractors on ESS10, ESS1, ESS4 and ESS8",
        timeline: "Q2",
        responsible: "MOA/SPCU",
        projected_cost: 6000,
      },

      {
        title:
          "Construction of satellite center",
        timeline: "Q2-Q3",
        responsible: "MOA/SPCU",
        projected_cost: 203000,
      },

      {
        title:
          "Supervision on implementation of Environmental and Social",
        timeline: "Q3-Q4",
        responsible: "MOA/SPCU",
        projected_cost: 32400,
      },
    ],
  },

  {
    component_code: "1",

    component_name:
      "Restore Agricultural and Pastoral Production",

    subcomponent_code: "1.1",

    subcomponent_name:
      "Resilient Agri-Livestock Research Extension and Seed Systems",

    workplan_no: 2,

    milestone:
      "Training of additional PICD Facilitators",

    output:
      "45 PICD facilitators trained, certified and equipped.",

    quarter: "Q2",

    timeline: "Q2",

    responsible: "MOA, MOLFR & SPCU",

    status: "planned",

    remarks: "",

    budget_information: "",

    activity_subactivities: [
      {
        title:
          "Develop PICD training curriculum and materials",
        timeline: "Q2",
        responsible: "MOA, MOLFR & SPCU",
        projected_cost: 15000,
      },

      {
        title:
          "Conduct PICD training of facilitators",
        timeline: "Q2",
        responsible: "MOA, MOLFR & SPCU",
        projected_cost: 90000,
      },
    ],
  },

  {
    component_code: "1",

    component_name:
      "Restore Agricultural and Pastoral Production",

    subcomponent_code: "1.1",

    subcomponent_name:
      "Resilient Agri-Livestock Research Extension and Seed Systems",

    workplan_no: 3,

    milestone:
      "Mass vaccination and selective treatment livestock",

    output:
      "900,000 livestock vaccinated and treated.",

    quarter: "Q1-Q3",

    timeline: "Q1-Q3",

    responsible: "MOLFR & SPCU",

    status: "planned",

    remarks: "",

    budget_information: "",

    activity_subactivities: [
      {
        title:
          "Conduct surveillance assessment",
        timeline: "Q1",
        responsible: "MOLFR & SPCU",
        projected_cost: 15000,
      },

      {
        title:
          "Develop livestock vaccination protocol",
        timeline: "Q1",
        responsible: "MOLFR & SPCU",
        projected_cost: 15000,
      },

      {
        title:
          "Procure veterinary drugs and equipment",
        timeline: "Q1",
        responsible: "MOLFR & SPCU",
        projected_cost: 150000,
      },

      {
        title:
          "ESS Training on mass vaccination campaign staff",
        timeline: "Q2",
        responsible: "MOLFR & SPCU",
        projected_cost: 5000,
      },

      {
        title:
          "Implement vaccination campaign",
        timeline: "Q2-Q3",
        responsible: "MOLFR & SPCU",
        projected_cost: 150000,
      },
    ],
  },

  {
    component_code: "2",

    component_name:
      "Strengthening Resilient Agricultural Production Systems",

    subcomponent_code: "2.1",

    subcomponent_name:
      "Water availability for agriculture and livestock",

    workplan_no: 4,

    milestone:
      "Construction of 40km irrigation canals",

    output:
      "40km irrigation canal constructed and operational.",

    quarter: "Q1-Q4",

    timeline: "Q1-Q4",

    responsible: "MOA/SPCU",

    status: "planned",

    remarks: "",

    budget_information: "",

    activity_subactivities: [
      {
        title:
          "Develop EOI and bid evaluation",
        timeline: "Q2",
        responsible: "MOA/SPCU",
        projected_cost: 10000,
      },

      {
        title:
          "Training contractors on ESS10 and ESS4",
        timeline: "Q2",
        responsible: "MOA/SPCU",
        projected_cost: 5000,
      },

      {
        title:
          "Construction of irrigation canals",
        timeline: "Q2-Q4",
        responsible: "MOA/SPCU",
        projected_cost: 350000,
      },

      {
        title:
          "Implementation supervision",
        timeline: "Q3-Q4",
        responsible: "MOA/SPCU",
        projected_cost: 25000,
      },
    ],
  },

  {
    component_code: "3",

    component_name:
      "Farmer Producer Organizations and Agri-food Enterprises",

    subcomponent_code: "3.2",

    subcomponent_name:
      "Market Infrastructure and Enterprise Development",

    workplan_no: 5,

    milestone:
      "Construction of 1 Agriculture Market",

    output:
      "1 fully operational agriculture market established.",

    quarter: "Q1-Q4",

    timeline: "Q1-Q4",

    responsible: "MOA/SPCU",

    status: "planned",

    remarks: "",

    budget_information: "",

    activity_subactivities: [
      {
        title:
          "Site ES screening and ESMP preparation",
        timeline: "Q1",
        responsible: "MOA/SPCU",
        projected_cost: 10000,
      },

      {
        title:
          "Technical assessment and BoQ preparation",
        timeline: "Q1",
        responsible: "MOA/SPCU",
        projected_cost: 36000,
      },

      {
        title:
          "Training contractors on ESS10, ESS1, ESS4 and ESS8",
        timeline: "Q2",
        responsible: "MOA/SPCU",
        projected_cost: 5000,
      },

      {
        title:
          "Site construction",
        timeline: "Q2-Q4",
        responsible: "MOA/SPCU",
        projected_cost: 140000,
      },

      {
        title:
          "Environmental and Social supervision",
        timeline: "Q3-Q4",
        responsible: "MOA/SPCU",
        projected_cost: 3000,
      },

      {
        title:
          "Formation and training of market management committees",
        timeline: "Q4",
        responsible: "MOA/SPCU",
        projected_cost: 18000,
      },

      {
        title:
          "Conduct handover ceremony",
        timeline: "Q4",
        responsible: "MOA/SPCU",
        projected_cost: 5000,
      },
    ],
  },

  {
    component_code: "4",

    component_name:
      "Project Management and Institutional Capacity",

    subcomponent_code: "4.1",

    subcomponent_name:
      "Ministerial Capacity Building",

    workplan_no: 6,

    milestone:
      "Construction of HQ Offices for MoAI",

    output:
      "1 HQ Office building for MoAI constructed and operational.",

    quarter: "Q1-Q4",

    timeline: "Q1-Q4",

    responsible: "MOAI/SPCU",

    status: "planned",

    remarks: "",

    budget_information: "",

    activity_subactivities: [
      {
        title:
          "Site ES Screening and ESMP Preparation",
        timeline: "Q1",
        responsible: "MOAI/SPCU",
        projected_cost: 5000,
      },

      {
        title:
          "Technical assessment and BoQ preparation",
        timeline: "Q1",
        responsible: "MOAI/SPCU",
        projected_cost: 15000,
      },

      {
        title:
          "Training on ESS10, ESS1, ESS4 and ESS8",
        timeline: "Q2",
        responsible: "MOAI/SPCU",
        projected_cost: 5000,
      },

      {
        title:
          "Site construction",
        timeline: "Q2-Q4",
        responsible: "MOAI/SPCU",
        projected_cost: 400000,
      },

      {
        title:
          "Environmental and Social supervision",
        timeline: "Q3-Q4",
        responsible: "MOAI/SPCU",
        projected_cost: 10000,
      },

      {
        title:
          "Conduct handover ceremony",
        timeline: "Q4",
        responsible: "MOAI/SPCU",
        projected_cost: 5000,
      },
    ],
  },

  {
    component_code: "5",

    component_name:
      "Project Implementation Coordination and M&E",

    subcomponent_code: "5.2",

    subcomponent_name:
      "Monitoring and Evaluation",

    workplan_no: 7,

    milestone:
      "Routine monitoring and evaluation",

    output:
      "Field activities routinely monitored and evaluated.",

    quarter: "Q1-Q4",

    timeline: "Q1-Q4",

    responsible: "SPCU-M&E",

    status: "planned",

    remarks: "",

    budget_information: "",

    activity_subactivities: [
      {
        title:
          "Routine field monitoring visits",
        timeline: "Q1-Q4",
        responsible: "SPCU-M&E",
        projected_cost: 20000,
      },

      {
        title:
          "Capacity training for technical staff",
        timeline: "Q1-Q2",
        responsible: "SPCU-M&E",
        projected_cost: 20000,
      },
    ],
  },
];

const seedWorkplans = async () => {
  try {
    console.log("Starting workplan seeding...");

    for (const item of workplans) {
      let component = await Component.findOne({
        code: item.component_code,
      });

      if (!component) {
        component = await Component.create({
          code: item.component_code,
          name: item.component_name,
          status: "active",
        });
      }

      let subcomponent = await Subcomponent.findOne({
        code: item.subcomponent_code,
      });

      if (!subcomponent) {
        subcomponent = await Subcomponent.create({
          component: component._id,
          code: item.subcomponent_code,
          name: item.subcomponent_name,
          status: "active",
        });
      }

      const milestone_total_budget =
        item.activity_subactivities.reduce(
          (sum, sub) =>
            sum + Number(sub.projected_cost || 0),
          0
        );

      const exists = await Workplan.findOne({
        milestone: item.milestone,
      });

      if (exists) {
        console.log(
          `Skipping existing: ${item.milestone}`
        );
        continue;
      }

      await Workplan.create({
        component: component._id,

        subcomponent: subcomponent._id,

        subcomponent_text:
          `${item.subcomponent_code}: ${item.subcomponent_name}`,

        workplan_no: item.workplan_no,

        milestone: item.milestone,

        activity_subactivities:
          item.activity_subactivities,

        output: item.output,

        quarter: item.quarter,

        timeline: item.timeline,

        responsible: item.responsible,

        milestone_total_budget,

        budget_information:
          item.budget_information,

        status: item.status,

        remarks: item.remarks,
      });

      console.log(
        `Seeded: ${item.milestone}`
      );
    }

    console.log(
      "Workplan seeding completed successfully."
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedWorkplans();