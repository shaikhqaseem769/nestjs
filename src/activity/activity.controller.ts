import { Controller, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('generate')
  async generate() {
    await this.activityService.generateActivity();
    return { message: 'GitHub activity generated' };
  }
}
