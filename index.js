const fs = require("fs");
const simpleGit = require("simple-git");
const dayjs = require("dayjs");

const git = simpleGit();

const REPO_NAME = "activity-repo";
const START_YEAR = 2024;
const END_YEAR = 2025;
const MAX_COMMITS_PER_MONTH = 5;

async function run() {
  if (!fs.existsSync(REPO_NAME)) {
    fs.mkdirSync(REPO_NAME);
  }
  process.chdir(REPO_NAME);

  await git.init();
  fs.writeFileSync("README.md", "GitHub Activity Generator\n");
  await git.add(".");
  await git.commit("Initial commit");

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (let month = 0; month < 12; month++) {
      // Pick random days (1–28) for commits
      const days = Array.from({ length: 28 }, (_, i) => i + 1)
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * MAX_COMMITS_PER_MONTH) + 1);

      for (const day of days) {
        const date = dayjs(`${year}-${month + 1}-${day} 12:00:00`);

        fs.appendFileSync(
          "README.md",
          `Commit on ${date.toISOString()}\n`
        );

        await git.add(".");
        await git.commit(
          `Commit on ${date.format("YYYY-MM-DD HH:mm:ss")}`,
          { "--date": date.toISOString() }
        );
      }
    }
  }

  console.log("✅ All contributions generated!");
}

run().catch(console.error);
