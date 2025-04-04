import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    //PostsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend', 'dist')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
