package com.rcc.lms.service;

import com.rcc.lms.repository.MarksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private MarksRepository marksRepository;

    /**
     * Industry Standard Logic: Compare current term average against baseline.
     * Uses the formula:
     * $$Percentage Change = \frac{Current - Previous}{Previous} \times 100$$
     */
    public String getPerformanceStatus(double currentAvg, double previousAvg) {
        if (previousAvg == 0) return "STABLE";

        double change = ((currentAvg - previousAvg) / previousAvg) * 100;

        if (change <= -10.0) return "ALERT";  // 10% drop or more
        if (change >= 5.0) return "GROWTH";   // 5% improvement or more
        return "STABLE";                      // Normal fluctuation
    }
}