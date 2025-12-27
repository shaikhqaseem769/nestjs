import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './test/app.controller';
import { AppService } from './test/app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        
            // type: 'postgres',
            // host: 'localhost',
            // port: 5432,
            // username: 'postgres',
            // password: 'doit',
            // database: 'task-management',
            // entities: [__dirname + '/**/*.entity.{js,ts}'], // 🔥 REQUIRED
            // autoLoadEntities: true,
            // synchronize: true, // OK for learning

            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASS'),
            database: configService.get('DB_NAME'),
            entities: [__dirname + '/**/*.entity.{js,ts}'], // 🔥 REQUIRED
            autoLoadEntities: true,
            synchronize: true, // OK for learning
        
      })
    }),
   
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
