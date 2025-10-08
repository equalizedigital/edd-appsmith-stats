export default {
	
	netNewMRR: () => {
		// normalize inputs
		const newData = (typeof NewMRRbyMo !== 'undefined' && Array.isArray(NewMRRbyMo.data)) ? NewMRRbyMo.data : [];
		const voluntaryData = (typeof VoluntaryChurnbyMo !== 'undefined' && Array.isArray(VoluntaryChurnbyMo.data)) ? VoluntaryChurnbyMo.data : [];
		const delinquentData = (typeof DelinquentChurnbyMo !== 'undefined' && Array.isArray(DelinquentChurnbyMo.data)) ? DelinquentChurnbyMo.data : [];

		if (newData.length === 0) {
			// Nothing to compute
			return { 'val': Numbers.formatCurrency(0), 'color': '#e65a5b' };
		}

		const i = newData.length - 1;
		const newSubs = Number(newData[i]?.mrr ?? 0);
		const voluntaryChurn = Number(voluntaryData[i]?.mrr ?? 0);
		const delinquentChurn = Number(delinquentData[i]?.mrr ?? 0);
		const netNew = newSubs - voluntaryChurn - delinquentChurn;
		
		var color = '#e65a5b';
		var prefix = '';
		
		if ( netNew > 0 ) {
			color = '#16b8a0';
			prefix = '+ ';
		}
		
		return { 'val' : prefix + Numbers.formatCurrency( netNew ), 'color' : color };
		
	},
	netMRR: () => {
		
		const netRevenueChanges = [];

		// normalize input data arrays (handles undefined sources or missing .data)
		const newData = (typeof NewMRRbyMo !== 'undefined' && Array.isArray(NewMRRbyMo.data)) ? NewMRRbyMo.data : [];
		const existingData = (typeof ExistingMRRbyMo !== 'undefined' && Array.isArray(ExistingMRRbyMo.data)) ? ExistingMRRbyMo.data : [];
		const voluntaryData = (typeof VoluntaryChurnbyMo !== 'undefined' && Array.isArray(VoluntaryChurnbyMo.data)) ? VoluntaryChurnbyMo.data : [];
		const delinquentData = (typeof DelinquentChurnbyMo !== 'undefined' && Array.isArray(DelinquentChurnbyMo.data)) ? DelinquentChurnbyMo.data : [];

		const length = Math.max(newData.length, existingData.length, voluntaryData.length, delinquentData.length);

		for (let i = 0; i < length; i++) {
			const existingSubs = Number(existingData[i]?.mrr ?? 0);
			const newSubs = Number(newData[i]?.mrr ?? 0);
			const voluntaryChurn = Number(voluntaryData[i]?.mrr ?? 0);
			const delinquentChurn = Number(delinquentData[i]?.mrr ?? 0);
			const netChange = existingSubs + newSubs - voluntaryChurn - delinquentChurn;
			netRevenueChanges.push( netChange );
		}
		
		return netRevenueChanges;

	},
	growthRate: () => {
		
		const netRevenueChanges = [];

		// normalize input data arrays
		const newData = (typeof NewMRRbyMo !== 'undefined' && Array.isArray(NewMRRbyMo.data)) ? NewMRRbyMo.data : [];
		const existingData = (typeof ExistingMRRbyMo !== 'undefined' && Array.isArray(ExistingMRRbyMo.data)) ? ExistingMRRbyMo.data : [];
		const voluntaryData = (typeof VoluntaryChurnbyMo !== 'undefined' && Array.isArray(VoluntaryChurnbyMo.data)) ? VoluntaryChurnbyMo.data : [];
		const delinquentData = (typeof DelinquentChurnbyMo !== 'undefined' && Array.isArray(DelinquentChurnbyMo.data)) ? DelinquentChurnbyMo.data : [];

		const length = Math.max(newData.length, existingData.length, voluntaryData.length, delinquentData.length);

		for (let i = 0; i < length; i++) {
			const existingSubs = Number(existingData[i]?.mrr ?? 0);
			const newSubs = Number(newData[i]?.mrr ?? 0);
			const voluntaryChurn = Number(voluntaryData[i]?.mrr ?? 0);
			const delinquentChurn = Number(delinquentData[i]?.mrr ?? 0);
			const netChange = newSubs - voluntaryChurn - delinquentChurn;
			const denom = (existingSubs + newSubs);
			const percentChange = denom === 0 ? 0 : ( netChange / denom ) * 100;
			netRevenueChanges.push( percentChange );
		}
		
		return netRevenueChanges;
		
	},
	netSubscribers: () => {
		
		const netSubscriberChanges = [];

		// normalize input data arrays
		const newData = (typeof NewMRRbyMo !== 'undefined' && Array.isArray(NewMRRbyMo.data)) ? NewMRRbyMo.data : [];
		const existingData = (typeof ExistingMRRbyMo !== 'undefined' && Array.isArray(ExistingMRRbyMo.data)) ? ExistingMRRbyMo.data : [];
		const voluntaryData = (typeof VoluntaryChurnbyMo !== 'undefined' && Array.isArray(VoluntaryChurnbyMo.data)) ? VoluntaryChurnbyMo.data : [];
		const delinquentData = (typeof DelinquentChurnbyMo !== 'undefined' && Array.isArray(DelinquentChurnbyMo.data)) ? DelinquentChurnbyMo.data : [];

		const length = Math.max(newData.length, existingData.length, voluntaryData.length, delinquentData.length);

		for (let i = 0; i < length; i++) {
			const existingSubs = Number(existingData[i]?.subscriptions ?? 0);
			const newSubs = Number(newData[i]?.subscriptions ?? 0);
			const voluntaryChurn = Number(voluntaryData[i]?.subscriptions ?? 0);
			const delinquentChurn = Number(delinquentData[i]?.subscriptions ?? 0);
			const netChange = existingSubs + newSubs - voluntaryChurn - delinquentChurn;
			netSubscriberChanges.push( netChange );
		}
		
		return netSubscriberChanges;
		
	}
}
