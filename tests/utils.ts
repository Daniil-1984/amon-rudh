// utils.ts

/**
 * Generates a random email address.
 * @param domain domain to use (default: gmail.com)
 * @returns randomized email
 */
export function generateRandomEmail(domain = "gmail.com"): string {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `user_${randomString}@${domain}`;
}

/**
 * Waits for the specified milliseconds
 * @param ms milliseconds to wait
 * @returns Promise<void>
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Starts video recording for Playwright
 * @param page Playwright Page object
 * @param videoPath where to save the video file
 */
export async function startVideoRecording(page: any, videoPath: string) {
  await page.context().tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });
  // You might configure the video folder also via playwright.config
  console.log(`Started tracing, will save to ${videoPath}`);
}

/**
 * Stops video recording for Playwright and saves the trace
 * @param page Playwright Page object
 * @param videoPath where to save the trace zip
 */
export async function stopVideoRecording(page: any, videoPath: string) {
  await page.context().tracing.stop({ path: videoPath });
  console.log(`Saved tracing video to ${videoPath}`);
}
