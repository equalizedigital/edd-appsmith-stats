export default {
	tableData: () => {
		const source = RenewalCohortRates.data || [];
		const yearNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		const rateColor = (value) => {
			if (value === null || value === undefined || Number.isNaN(Number(value))) {
				return '#ffffff';
			}

			const clamped = Math.max(0, Math.min(55, Number(value)));
			const hue = Math.round((clamped / 55) * 110);
			const saturation = 58;
			const lightness = 92 - (clamped / 55) * 8;

			return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		};

		const rowsByCohort = {};

		source.forEach((entry) => {
			const cohort = Number(entry.cohort_year);
			const licenses = Number(entry.original_licenses);
			const renewalYear = Number(entry.renewal_year);
			const renewalRate = entry.renewal_rate === null ? null : Number(entry.renewal_rate);

			if (!rowsByCohort[cohort]) {
				rowsByCohort[cohort] = {
					cohort,
					licenses,
					licenses_label: licenses.toLocaleString('en-US')
				};

				yearNumbers.forEach((yearNumber) => {
					const yearKey = `year_${yearNumber}`;
					rowsByCohort[cohort][yearKey] = null;
					rowsByCohort[cohort][`${yearKey}_label`] = '—';
					rowsByCohort[cohort][`${yearKey}_color`] = '#ffffff';
					rowsByCohort[cohort][`${yearKey}_text_color`] = '#6b7280';
				});
			}

			if (!yearNumbers.includes(renewalYear)) {
				return;
			}

			const yearKey = `year_${renewalYear}`;
			rowsByCohort[cohort][yearKey] = renewalRate;
			rowsByCohort[cohort][`${yearKey}_label`] = renewalRate === null ? '—' : `${renewalRate.toFixed(1)}%`;
			rowsByCohort[cohort][`${yearKey}_color`] = rateColor(renewalRate);
			rowsByCohort[cohort][`${yearKey}_text_color`] = renewalRate === null ? '#6b7280' : '#374151';
		});

		return Object.values(rowsByCohort).sort((left, right) => left.cohort - right.cohort);
	}
}