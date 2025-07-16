<template>
    <div
        id="call-logs"
        class="container"
    >
        <!-- Header -->
        <header class="page-header mb-5">
            <h1>Call Logs</h1>
        </header>

        <!-- Main Table -->
        <section id="call-logs-table">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
						<tr>
                            <th
                                v-for="(header, index) in tableHeader"
                                :key="index"
                            >
                                {{ header }}
                            </th>
						</tr>
					</thead>
                    <tbody>
                        <tr
                            v-for="(log, index) in callLogs"
                            :key="log.id + index"
                            class=""
                        >
                            <!-- No -->
                            <td>{{ index + 1 }}</td>

                            <!-- Name -->
                            <td>{{ log?.name ?? '' }}</td>

                            <!-- Timestamp -->
                            <td>{{ formatTimestampToDate(log?.created_at) ?? '' }}</td>

                            <!-- Duration -->
                            <td>{{ convertSecondToTime(log?.duration) ?? '' }}</td>

                            <!-- Status -->
                            <td>{{ log?.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Table Empty -->
            <div
                v-if="callLogs.length === 0 && isFetching === false"
                class="d-flex justify-content-center align-items-center w-100 mt-4"
            >
                <i class="material-icons md-48 me-2">error_outline</i>
                <span>Call log is empty.</span>
            </div>

            <!-- Table Loader -->
            <div v-if="isFetching" class="d-flex justify-content-center w-100 mt-4">
                <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { getCallLogs } from '@/api/crm';
import {
    convertSecondToTime,
    getAxiosErrorMessage,
    formatTimestampToDate,
 } from '@/lib/helper';

const tableHeader = [
    'No',
    'Name',
    'Timestamp',
    'Duration',
    'Status',
];

export default {
    name: 'CallLogsView',
    data() {
        return {
            tableHeader,
            callLogs: [],
            isFetching: false,
        };
    },
    async mounted() {
        await this.fetchCallLogs();
    },
    methods: {
        convertSecondToTime,
        formatTimestampToDate,
        async fetchCallLogs() {
            this.isFetching = true;
            try {
                const response = await getCallLogs();
                this.callLogs = response?.data ?? [];
                this.isFetching = false;
            } catch (error) {
                this.isFetching = false;
                console.log('--error', getAxiosErrorMessage(error));
            }
        },
    },
}
</script>
