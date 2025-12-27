import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import simpleGit, { SimpleGit } from 'simple-git';
import dayjs from 'dayjs';

@Injectable()
export class ActivityService {
  private readonly REPO_NAME = 'activity-repo';
  private readonly START_YEAR = 2024;
  private readonly END_YEAR = 2025;
  private readonly MAX_COMMITS_PER_MONTH = 5;

  private readonly repoPath = path.join(process.cwd(), this.REPO_NAME);
  private readonly readmePath = path.join(this.repoPath, 'README.md');

  private git!: SimpleGit;

  async generateActivity(): Promise<{ message: string }> {
    if (!fs.existsSync(this.repoPath)) {
      fs.mkdirSync(this.repoPath);
    }

    this.git = simpleGit(this.repoPath);

    if (!fs.existsSync(path.join(this.repoPath, '.git'))) {
      await this.git.init();
      fs.writeFileSync(this.readmePath, 'GitHub Activity Generator\n');
      await this.git.add('.');
      await this.git.commit('Initial commit');
    }

    for (let year = this.START_YEAR; year <= this.END_YEAR; year++) {
      for (let month = 0; month < 12; month++) {
        const commitDays = this.pickRandomDays(
          28,
          Math.floor(Math.random() * this.MAX_COMMITS_PER_MONTH) + 1,
        );

        for (const day of commitDays) {
          const date = dayjs(`${year}-${month + 1}-${day} 12:00:00`);

          fs.appendFileSync(
            this.readmePath,
            `Commit on ${date.toISOString()}\n`,
          );

          await this.git.add('.');
          await this.git.commit(
            `Commit on ${date.format('YYYY-MM-DD HH:mm:ss')}`,
            { '--date': date.toISOString() },
          );
        }
      }
    }

    return { message: 'All contributions generated' };
  }

  private pickRandomDays(maxDay: number, count: number): number[] {
    return Array.from({ length: maxDay }, (_, i) => i + 1)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }
}
