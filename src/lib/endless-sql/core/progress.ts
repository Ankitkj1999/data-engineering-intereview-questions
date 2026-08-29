export interface ProgressStore {
  isCompleted(id: string): boolean;
  markCompleted(id: string): void;
  getDraft(id: string): string | null;
  saveDraft(id: string, code: string): void;
  getCompletedCount(exerciseIds: string[]): number;
}

export class LocalStorageProgressStore implements ProgressStore {
  private prefix: string;

  constructor(prefix = "q_") {
    this.prefix = prefix;
  }

  isCompleted(id: string): boolean {
    try {
      const data = localStorage.getItem(`${this.prefix}${id}`);
      return data ? JSON.parse(data).done === true : false;
    } catch {
      return false;
    }
  }

  markCompleted(id: string): void {
    try {
      localStorage.setItem(`${this.prefix}${id}`, JSON.stringify({ done: true }));
    } catch {}
  }

  getDraft(id: string): string | null {
    try {
      return localStorage.getItem(`${this.prefix}draft_${id}`);
    } catch {
      return null;
    }
  }

  saveDraft(id: string, code: string): void {
    try {
      localStorage.setItem(`${this.prefix}draft_${id}`, code);
    } catch {}
  }

  getCompletedCount(exerciseIds: string[]): number {
    return exerciseIds.filter((id) => this.isCompleted(id)).length;
  }
}

