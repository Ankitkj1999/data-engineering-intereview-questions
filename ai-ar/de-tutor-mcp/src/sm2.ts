export interface Sm2State {
	ease: number;
	interval_days: number;
}

export interface Sm2Result {
	ease: number;
	interval_days: number;
	due_ts: number;
}

/**
 * Standard SM-2. There's no stored repetition count (schema only has
 * ease/interval_days/due_ts), so the repetition stage is inferred from
 * interval_days: 0 = never reviewed, 1 = first successful review, >1 = later.
 */
export function sm2Update(prev: Sm2State, quality: number, now: number = Date.now()): Sm2Result {
	const q = Math.max(0, Math.min(5, Math.round(quality)));

	let ease = prev.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
	ease = Math.max(1.3, ease);

	let interval_days: number;
	if (q < 3) {
		interval_days = 1;
	} else if (prev.interval_days <= 0) {
		interval_days = 1;
	} else if (prev.interval_days === 1) {
		interval_days = 6;
	} else {
		interval_days = Math.round(prev.interval_days * ease);
	}

	const due_ts = now + interval_days * 24 * 60 * 60 * 1000;
	return { ease, interval_days, due_ts };
}

/** correct + a 1-5 self/other-rated confidence -> SM-2 quality (0-5). */
export function toQuality(correct: boolean, confidence: number): number {
	const c = Math.max(1, Math.min(5, Math.round(confidence)));
	return correct ? Math.max(3, c) : Math.min(2, c - 1);
}
