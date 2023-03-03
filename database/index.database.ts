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
import { MediaCv } from '../models/mediaUserProfileCV';
import { Role } from '../models/userRole';
import { ToApplyJob } from '../models/jobToApply';
import { ExperienceCv } from '../models/cvExperience';
import { SkillCv } from '../models/cvSkill';
import { CourseCV } from '../models/cvCourse';
import { MediaCover } from '../models/mediaUserProfileCover';
import { TalkMail } from '../models/talkMail';
import { Chat } from '../models/chat';
import { env } from '../config/env.config';
import { Follow } from '../models/userFollow';
import { ActivityLog } from '../models/userActivityLog';

export const db = new DataSource({
   type: 'mysql',
   host: env.HOST,
   username: env.USERNAME,
   password: env.PASSWORD,
   database: env.DATABASE,
   charset: env.CHARSET,
   port: env.PORT_DB,

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
      TalkMail,
      Chat,
      Follow,
      ActivityLog
   ],
   migrations: ['migration/*.js'],
   logging: false,
   synchronize: true,
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
