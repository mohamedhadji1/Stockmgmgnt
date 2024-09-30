package stock.example.companyy.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import stock.example.companyy.entities.sequence;
@Service
public class SequenceGeneratorService {
    @Autowired
    private MongoOperations mongoOperations;

    public int generateSequence(String seqName) {
        Query query = new Query(Criteria.where("_id").is(seqName));
        Update update = new Update().inc("seq", 1);
        sequence counter = mongoOperations.findAndModify(query, update, sequence.class);
        if (counter == null) {
            counter = new sequence();
            counter.setId(seqName);
            counter.setSeq(1);
            mongoOperations.save(counter);
            return 1;
        }
        return counter.getSeq();
    }
}