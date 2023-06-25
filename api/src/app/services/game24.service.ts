export class Game24Service {
  find24(nums: number[], result = 24): boolean {
    if (nums.length === 1) return Math.abs(nums[0] - result) < 1e-6;

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const a = nums[i];
        const b = nums[j];
        const remaining = nums.filter((_, index) => index !== i && index !== j);

        if (this.find24([a + b, ...remaining], result)) return true;
        if (this.find24([a - b, ...remaining], result)) return true;
        if (this.find24([a * b, ...remaining], result)) return true;
        if (this.find24([a / b, ...remaining], result)) return true;
        if (this.find24([b - a, ...remaining], result)) return true;
        if (this.find24([b / a, ...remaining], result)) return true;
      }
    }

    return false;
  }
}
