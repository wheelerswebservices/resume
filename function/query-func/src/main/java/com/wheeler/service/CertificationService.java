package com.wheeler.service;

import com.wheeler.dao.filter.QueryFilter;
import com.wheeler.dao.model.Certification;
import com.wheeler.dao.repository.CertificationRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;

@Service
public class CertificationService {

    private final CertificationRepository repository;

    public CertificationService(final CertificationRepository repository) {
        this.repository = repository;
    }

    @Bean
    public Function<QueryFilter, List<Certification>> certificationRetrieve() {
        return filter -> {
            List<Certification> results;
            if (filter.getId() != null) {
                results = findOne(filter.getId());
            } else {
                results = findAll();
            }
            return results;
        };
    }

    private List<Certification> findAll(){
        return repository.findAll();
    }
    private List<Certification> findOne(String id){
        return Collections.singletonList(repository.findOne(id));
    }
}
