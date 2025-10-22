export interface Database {
    public: {
        Tables: {
            tasks: {
                Row: {
                    id: string;
                    title: string;
                    completed: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    completed?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    title?: string;
                    completed?: boolean;
                    created_at?: string;
                };
            };
        };
    };
}
