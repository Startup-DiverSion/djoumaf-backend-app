import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { Job } from '../models/jobs';
import { Media } from '../models/mediaUserProfile';
import { Profile } from '../models/userProfile';
import { TypeParameter } from '../models/parameterType';
import { Parameter } from '../models/parameter';
import { Preference } from '../models/userPreference';
import { ModelCv } from '../models/cvModel';
import { UserCv } from '../models/cvUser';
import { MediaCv } from '../models/cvMedia';
import { Role } from '../models/userRole';
import { ToApplyJob } from '../models/jobToApply';
import { ExperienceCv } from '../models/cvExperience';
import { SkillCv } from '../models/cvSkill';
import { CourseCV } from '../models/cvCourse';
import { MediaCover } from '../models/mediaUserProfileCover';

export const db = new DataSource({
   type: 'mysql',

   // Productions
   // host: "localhost",
   // username: "djoumaf",
   // password: "djoumaf-nray-20",
   // database: "nxs_djoumaf",

   // Developpement
   host: 'localhost',
   username: 'root',
   password: '',
   database: 'nxs_djoumaf',

   port: 3306,
   entities: [
      User,
      Job,
      Media,
      Profile,
      TypeParameter,
      Parameter,
      Preference,
      ModelCv,
      UserCv,
      MediaCv,
      MediaCover,
      Role,
      ToApplyJob,
      ExperienceCv,
      CourseCV,
      SkillCv,
   ],
   migrations: ['migration/*.js'],
   logging: false,
   synchronize: true,
   connectTimeout: 90000,
});

export const startDb = () => {
   db.initialize()
      .then(() => {
         console.log('Data Source has been initialized!');
      })
      .catch((err) => {
         console.error('Error during Data Source initialization:', err);
      });
};
